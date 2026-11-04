import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { carregarSerie, dataDe, fmt, type PontoSerie } from "@/lib/cotacoes";

/**
 * Historico de um indicador: grafico com eixos e leitura por ponto, os numeros do
 * periodo, a tabela dos ultimos pregoes e o CSV.
 *
 * A serie e' buscada do JSON publico depois da montagem (nunca entra no bundle:
 * cresce um ponto por dia util para sempre). Enquanto nao chega, diz que esta
 * carregando; se falhar, diz que falhou. Nao inventa linha.
 *
 * Uma cor so (a do site): e' uma serie por vez, entao a cor nao carrega
 * identidade, e a comparacao entre indicadores fica nos pequenos multiplos.
 */

export type OpcaoIndicador = {
  key: string;
  rotulo: string;
  moeda: string;
  unidade: string;
  mensal?: boolean;
  /** Valor abaixo de R$ 10 (leite por litro): mostra 4 casas, como a fonte. */
  valorPequeno?: boolean;
};

const PERIODOS = [
  { id: "30", rotulo: "30 dias", dias: 30 },
  { id: "90", rotulo: "90 dias", dias: 90 },
  { id: "tudo", rotulo: "Toda a série", dias: 0 },
] as const;

type PeriodoId = (typeof PERIODOS)[number]["id"];

const curta = (ref: string) => ref.split("/").slice(0, 2).join("/");

function Variacao({ v }: { v: number | null }) {
  if (v === null || Number.isNaN(v)) return <span className="text-muted-foreground">s/ base</span>;
  const sobe = v > 0;
  const desce = v < 0;
  return (
    <span className={sobe ? "text-emerald-600" : desce ? "text-red-600" : "text-muted-foreground"}>
      {sobe ? "▲" : desce ? "▼" : "="} {fmt(Math.abs(v))}%
    </span>
  );
}

function baixarCsv(op: OpcaoIndicador, pontos: PontoSerie[]) {
  const linhas = [
    `data;valor_${op.moeda}_por_${op.unidade.replace(/\s+/g, "_")};fonte`,
    ...pontos.map((p) => `${p.data_ref};${String(p.valor).replace(".", ",")};CEPEA/ESALQ (CC BY-NC 4.0)`),
  ];
  const blob = new Blob(["﻿" + linhas.join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `cotacao-${op.key}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function HistoricoCotacao({ opcoes, inicial }: { opcoes: OpcaoIndicador[]; inicial?: string }) {
  const [key, setKey] = useState(inicial || opcoes[0].key);
  const [periodo, setPeriodo] = useState<PeriodoId>("90");
  const [series, setSeries] = useState<Record<string, PontoSerie[]>>({});
  const [erro, setErro] = useState<string | null>(null);
  const [verTodos, setVerTodos] = useState(false);
  const op = opcoes.find((o) => o.key === key) || opcoes[0];

  useEffect(() => {
    if (series[key]) return;
    let vivo = true;
    setErro(null);
    carregarSerie(key)
      .then((p) => vivo && setSeries((s) => ({ ...s, [key]: p })))
      .catch(() => vivo && setErro(key));
    return () => { vivo = false; };
  }, [key, series]);

  const todos = series[key];
  const visiveis = useMemo(() => {
    if (!todos?.length) return [];
    const p = PERIODOS.find((x) => x.id === periodo)!;
    if (op.mensal || !p.dias) return todos;
    const fim = dataDe(todos[todos.length - 1].data_ref)!;
    const corte = fim.getTime() - p.dias * 86400000;
    return todos.filter((x) => (dataDe(x.data_ref)?.getTime() ?? 0) >= corte);
  }, [todos, periodo, op.mensal]);

  const stats = useMemo(() => {
    if (visiveis.length < 2) return null;
    const ini = visiveis[0];
    const fim = visiveis[visiveis.length - 1];
    let mn = visiveis[0];
    let mx = visiveis[0];
    for (const p of visiveis) {
      if (p.valor < mn.valor) mn = p;
      if (p.valor > mx.valor) mx = p;
    }
    return { ini, fim, mn, mx, var: (fim.valor / ini.valor - 1) * 100 };
  }, [visiveis]);

  // Tabela: do mais recente para o mais antigo, com a variacao contra o ponto anterior.
  const tabela = useMemo(() => {
    const t = (todos || []).map((p, i, arr) => ({
      ...p,
      varDia: i ? (p.valor / arr[i - 1].valor - 1) * 100 : null,
    }));
    return t.reverse();
  }, [todos]);

  const casas = op.valorPequeno ? 4 : 2;
  const valorFmt = (v: number) =>
    v.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });

  const botao = (ativo: boolean) =>
    `rounded-full border px-3 py-1.5 text-sm transition-colors ${
      ativo
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-card text-foreground hover:bg-muted"
    }`;

  return (
    <div>
      {/* filtros: uma linha, acima de tudo o que eles recortam */}
      <div className="flex flex-wrap items-center gap-2">
        {opcoes.length > 1
          ? opcoes.map((o) => (
              <button key={o.key} type="button" className={botao(o.key === key)}
                      aria-pressed={o.key === key} onClick={() => { setKey(o.key); setVerTodos(false); }}>
                {o.rotulo}
              </button>
            ))
          : null}
        {!op.mensal ? (
          <span className="flex flex-wrap gap-2 sm:ml-auto">
            {PERIODOS.map((p) => (
              <button key={p.id} type="button" className={botao(p.id === periodo)}
                      aria-pressed={p.id === periodo} onClick={() => setPeriodo(p.id)}>
                {p.rotulo}
              </button>
            ))}
          </span>
        ) : null}
      </div>

      {erro === key ? (
        <p className="mt-6 text-sm text-muted-foreground">
          A série de {op.rotulo.toLowerCase()} não pôde ser carregada agora. O painel do topo não
          depende dela.
        </p>
      ) : !todos ? (
        <p className="mt-6 text-sm text-muted-foreground">Carregando a série de {op.rotulo.toLowerCase()}...</p>
      ) : (
        <>
          {stats ? (
            <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ["Última apuração", `${op.moeda} ${valorFmt(stats.fim.valor)}`, stats.fim.data_ref],
                ["Variação no período", null, `${stats.ini.data_ref} a ${stats.fim.data_ref}`],
                ["Mínima do período", `${op.moeda} ${valorFmt(stats.mn.valor)}`, stats.mn.data_ref],
                ["Máxima do período", `${op.moeda} ${valorFmt(stats.mx.valor)}`, stats.mx.data_ref],
              ].map(([t, v, d], i) => (
                <div key={t as string} className="rounded-xl border border-border bg-card p-4">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{t}</dt>
                  <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">
                    {i === 1 ? <Variacao v={stats.var} /> : v}
                  </dd>
                  <dd className="text-xs text-muted-foreground">{d}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <figure className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-6">
            <figcaption className="mb-3 text-sm text-muted-foreground">
              {op.rotulo}, em {op.moeda} por {op.unidade}. Passe o dedo ou o mouse sobre a linha
              para ler cada apuração.
            </figcaption>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visiveis} margin={{ top: 8, right: 12, bottom: 4, left: 4 }}>
                  <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="data_ref" tickFormatter={op.mensal ? undefined : curta}
                         tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                         tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }}
                         minTickGap={28} />
                  <YAxis domain={["auto", "auto"]} width={64}
                         tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                         tickLine={false} axisLine={false}
                         tickFormatter={(v: number) => v.toLocaleString("pt-BR", { maximumFractionDigits: casas })} />
                  <Tooltip
                    cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const p = payload[0].payload as PontoSerie;
                      return (
                        <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-sm">
                          <div className="text-base font-semibold tabular-nums text-foreground">
                            {op.moeda} {valorFmt(p.valor)}
                          </div>
                          <div className="text-xs text-muted-foreground">{p.data_ref}</div>
                        </div>
                      );
                    }}
                  />
                  <Line type="linear" dataKey="valor" stroke="hsl(var(--primary))" strokeWidth={2}
                        dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                        isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </figure>

          <div className="mt-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h3 className="text-xl font-bold text-foreground">Histórico de apurações</h3>
              <button type="button" onClick={() => baixarCsv(op, todos)}
                      className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted">
                Baixar a série em CSV
              </button>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {todos.length} apurações de {todos[0]?.data_ref} a {todos[todos.length - 1]?.data_ref}, da
              mais recente para a mais antiga. A variação é contra a apuração anterior.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th scope="col" className="px-4 py-2 font-semibold">Apuração</th>
                    <th scope="col" className="px-4 py-2 text-right font-semibold">{op.moeda} por {op.unidade}</th>
                    <th scope="col" className="px-4 py-2 text-right font-semibold">Variação</th>
                  </tr>
                </thead>
                <tbody>
                  {(verTodos ? tabela : tabela.slice(0, 10)).map((p) => (
                    <tr key={p.data_ref} className="border-b border-border last:border-0">
                      <td className="px-4 py-2 tabular-nums">{p.data_ref}</td>
                      <td className="px-4 py-2 text-right font-medium tabular-nums">{valorFmt(p.valor)}</td>
                      <td className="px-4 py-2 text-right tabular-nums"><Variacao v={p.varDia} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {tabela.length > 10 ? (
              <button type="button" onClick={() => setVerTodos((v) => !v)}
                      className="mt-3 text-sm font-semibold text-primary underline underline-offset-4">
                {verTodos ? "Mostrar só as 10 mais recentes" : `Ver as ${tabela.length} apurações`}
              </button>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
