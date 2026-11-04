import { useEffect, useMemo, useState } from "react";
import { Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { carregarSerie, dataDe, fmt, type PontoSerie } from "@/lib/cotacoes";

/**
 * Quem subiu e quem caiu no mesmo periodo: cada indicador diario em base 100 no
 * primeiro pregao da janela.
 *
 * POR QUE PEQUENOS MULTIPLOS E NAO UM GRAFICO SO: os indicadores tem unidades e
 * escalas sem relacao (R$ 66 a saca de milho, R$ 1.600 a de cafe, R$ 390 a
 * arroba). Em base 100 eles cabem no mesmo eixo, mas seis linhas sobrepostas
 * pediriam seis cores, e o site tem uma. Um painel por indicador, todos com o
 * MESMO eixo vertical, deixa a comparacao honesta: a mesma altura e' a mesma
 * variacao em todos.
 */

export type ItemComparacao = { key: string; rotulo: string };

const DIAS = 90;

export function ComparacaoBase100({ itens }: { itens: ItemComparacao[] }) {
  const [series, setSeries] = useState<Record<string, PontoSerie[]>>({});
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    let vivo = true;
    Promise.all(itens.map((i) => carregarSerie(i.key).then((p) => [i.key, p] as const).catch(() => null)))
      .then((r) => {
        if (!vivo) return;
        const ok = r.filter(Boolean) as (readonly [string, PontoSerie[]])[];
        if (!ok.length) setFalhou(true);
        setSeries(Object.fromEntries(ok));
      });
    return () => { vivo = false; };
  }, [itens]);

  const paineis = useMemo(() => {
    const lista = itens
      .filter((i) => series[i.key]?.length)
      .map((i) => {
        const todos = series[i.key];
        const fim = dataDe(todos[todos.length - 1].data_ref)!.getTime();
        const janela = todos.filter((p) => (dataDe(p.data_ref)?.getTime() ?? 0) >= fim - DIAS * 86400000);
        const base = janela[0]?.valor || 1;
        const pontos = janela.map((p) => ({ data_ref: p.data_ref, indice: (p.valor / base) * 100 }));
        return { ...i, pontos, var: pontos.length ? pontos[pontos.length - 1].indice - 100 : 0 };
      });
    const vals = lista.flatMap((p) => p.pontos.map((x) => x.indice));
    const mn = Math.floor(Math.min(100, ...vals) - 1);
    const mx = Math.ceil(Math.max(100, ...vals) + 1);
    // ordem fixa (a do painel), nunca por quem subiu mais: a posicao identifica o indicador
    return { lista, dominio: [mn, mx] as [number, number] };
  }, [itens, series]);

  if (falhou) {
    return <p className="text-sm text-muted-foreground">As séries não puderam ser carregadas agora.</p>;
  }
  if (!paineis.lista.length) {
    return <p className="text-sm text-muted-foreground">Carregando as séries...</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {paineis.lista.map((p) => {
        const sobe = p.var > 0;
        const desce = p.var < 0;
        return (
          <figure key={p.key} className="rounded-xl border border-border bg-card p-4">
            <figcaption className="flex items-baseline justify-between gap-2">
              <span className="font-semibold text-foreground">{p.rotulo}</span>
              <span className={`text-sm font-semibold tabular-nums ${sobe ? "text-emerald-600" : desce ? "text-red-600" : "text-muted-foreground"}`}>
                {sobe ? "▲" : desce ? "▼" : "="} {fmt(Math.abs(p.var))}%
              </span>
            </figcaption>
            <div className="mt-2 h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={p.pontos} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                  <XAxis dataKey="data_ref" hide />
                  <YAxis domain={paineis.dominio} width={30} tickCount={3}
                         tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                         tickLine={false} axisLine={false} />
                  <ReferenceLine y={100} stroke="hsl(var(--border))" />
                  <Tooltip
                    cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const x = payload[0].payload as { data_ref: string; indice: number };
                      return (
                        <div className="rounded-lg border border-border bg-background px-2 py-1 text-xs shadow-sm">
                          <div className="font-semibold tabular-nums text-foreground">{fmt(x.indice)}</div>
                          <div className="text-muted-foreground">{x.data_ref}</div>
                        </div>
                      );
                    }}
                  />
                  <Line type="linear" dataKey="indice" stroke="hsl(var(--primary))" strokeWidth={2}
                        dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {p.pontos[0]?.data_ref} = 100 · {p.pontos[p.pontos.length - 1]?.data_ref} ={" "}
              {fmt(p.pontos[p.pontos.length - 1]?.indice ?? 100)}
            </p>
          </figure>
        );
      })}
    </div>
  );
}
