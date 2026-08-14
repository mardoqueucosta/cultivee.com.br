import { useEffect, useMemo, useState } from "react";
import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PageHeader } from "@/components/blog/PageHeader";
import { SITE_BASE, breadcrumbJsonLd } from "@/lib/breadcrumb-schema";
import {
  COTACOES, type ItemCotacao, dataPorExtenso, fmt, horaDe, itemPorKey,
} from "@/lib/cotacoes";

/**
 * Pagina ancora da cotacao do cafe.
 *
 * Contrato de conteudo: `07-cotacoes-site/conteudo/cotacoes-cafe.md`.
 * Arquitetura de ancora e spokes: §6.3 e §6.4 do CLAUDE.md daquele projeto.
 *
 * DUAS REGRAS QUE NAO PODEM SER QUEBRADAS AQUI:
 *
 * 1. NENHUM NUMERO ESCRITO A MAO. Tudo sai do `ultimo.json`, que o coletor
 *    grava todo dia util as 05:30. Numero no JSX envelhece em um dia e passa a
 *    mentir numa pagina cujo produto inteiro e' estar certa hoje.
 *
 * 2. O SNAPSHOT entra no BUILD (import estatico, ~6 KB, e' o que precisa estar
 *    no HTML quando o Google rastreia). A SERIE e' buscada SOB DEMANDA de
 *    `/dados/cotacoes/series/`, nunca importada. O chunk `blogArticles` deste
 *    mesmo site tem 2,7 MB porque embutiu o corpus inteiro em JS; a serie de
 *    precos cresce todo dia e faria pior.
 */

const DADOS = COTACOES;
const URL_PAGINA = `${SITE_BASE}/cotacoes/cafe`;
const item = itemPorKey;

const ARABICA = item("cafe-arabica");
const CONILON = item("cafe-robusta");

/** Cartao de indicador. Sem valor, o cartao nao aparece: melhor faltar do que inventar. */
function Cartao({ dado, titulo, detalhe }: { dado?: ItemCotacao; titulo: string; detalhe: string }) {
  if (!dado) return null;
  const sobe = (dado.var_pct ?? 0) > 0;
  const desce = (dado.var_pct ?? 0) < 0;
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {titulo}
      </h2>
      <p className="mt-2 flex items-baseline gap-2">
        <span className="text-4xl font-bold tabular-nums">
          {dado.moeda} {dado.valor_fmt}
        </span>
        <span className="text-sm text-muted-foreground">por {dado.unidade}</span>
      </p>
      <p className="mt-2 text-sm">
        {dado.var_pct === null ? (
          <span className="text-muted-foreground">sem referência anterior para comparar</span>
        ) : (
          <span className={sobe ? "text-emerald-600" : desce ? "text-red-600" : "text-muted-foreground"}>
            {sobe ? "▲" : desce ? "▼" : "="} {fmt(Math.abs(dado.var_pct))}% no dia
            {dado.var_base ? `, contra ${dado.var_base}` : ""}
          </span>
        )}
      </p>
      {dado.sequencia ? (
        <p className="mt-1 text-sm text-muted-foreground">
          {dado.sequencia.dias}ª {dado.sequencia.direcao} seguida
        </p>
      ) : null}
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{detalhe}</p>
    </div>
  );
}

/** Conversor. Um dos dois unicos blocos que justificam JavaScript nesta pagina. */
function Conversor() {
  const [key, setKey] = useState(ARABICA ? "cafe-arabica" : "cafe-robusta");
  const [qtd, setQtd] = useState("1");
  const [unidade, setUnidade] = useState("saca");
  const escolhido = item(key);
  const porSaca = escolhido?.valor ?? 0;
  const emSacas: Record<string, number> = { saca: 1, arroba: 15 / 60, quilo: 1 / 60, tonelada: 1000 / 60 };
  const n = Number(String(qtd).replace(",", ".")) || 0;
  const sacas = n * (emSacas[unidade] ?? 1);
  const total = sacas * porSaca;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Quantidade</span>
          <input
            inputMode="decimal"
            value={qtd}
            onChange={(e) => setQtd(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Unidade</span>
          <select
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2"
          >
            <option value="saca">saca de 60 kg</option>
            <option value="arroba">arroba de 15 kg</option>
            <option value="quilo">quilo</option>
            <option value="tonelada">tonelada</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Café</span>
          <select
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2"
          >
            {ARABICA ? <option value="cafe-arabica">arábica</option> : null}
            {CONILON ? <option value="cafe-robusta">conilon</option> : null}
          </select>
        </label>
      </div>
      <p className="mt-5 text-2xl font-bold tabular-nums">R$ {fmt(total)}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        equivale a {fmt(sacas)} saca(s) de 60 kg, {fmt(sacas * 4)} arroba(s) e {fmt(sacas * 60)} kg
      </p>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        O cálculo usa o indicador de referência. O valor de um negócio real muda com a
        qualidade do lote, o tipo de bebida, a peneira, o prazo de pagamento e o frete.
      </p>
    </div>
  );
}

type Ponto = { data_ref: string; valor: number };

/**
 * Grafico. O outro bloco que justifica JS.
 *
 * A serie e' buscada do JSON publico DEPOIS da montagem, nunca importada: ela
 * cresce um ponto por dia util, para sempre. Enquanto nao chega, o bloco diz
 * que esta carregando, e se falhar diz que falhou. Nao inventa linha.
 */
function Grafico({ commodity, rotulo }: { commodity: string; rotulo: string }) {
  const [pontos, setPontos] = useState<Ponto[] | null>(null);
  const [erro, setErro] = useState(false);
  const ano = new Date().getFullYear();

  useEffect(() => {
    let vivo = true;
    fetch(`/dados/cotacoes/series/${commodity}-${ano}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => vivo && setPontos((d.pontos as Ponto[]) || []))
      .catch(() => vivo && setErro(true));
    return () => { vivo = false; };
  }, [commodity, ano]);

  const svg = useMemo(() => {
    if (!pontos || pontos.length < 2) return null;
    const vals = pontos.map((p) => p.valor);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const faixa = max - min || 1;
    const w = 720;
    const h = 200;
    const d = pontos
      .map((p, i) => {
        const x = (i / (pontos.length - 1)) * w;
        const y = h - ((p.valor - min) / faixa) * h;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
    return { d, w, h, min, max, primeiro: pontos[0], ultimo: pontos[pontos.length - 1] };
  }, [pontos]);

  if (erro) {
    return (
      <p className="text-sm text-muted-foreground">
        A série de {rotulo} não pôde ser carregada agora. O número do topo desta página não
        depende dela.
      </p>
    );
  }
  if (!svg) {
    return <p className="text-sm text-muted-foreground">Carregando a série de {rotulo}...</p>;
  }
  return (
    <figure>
      <svg viewBox={`0 0 ${svg.w} ${svg.h}`} className="h-48 w-full" role="img"
           aria-label={`Série do ${rotulo} de ${svg.primeiro.data_ref} a ${svg.ultimo.data_ref}`}>
        <path d={svg.d} fill="none" stroke="currentColor" strokeWidth="2"
              className="text-emerald-600" />
      </svg>
      <figcaption className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
        <span>início da série: {svg.primeiro.data_ref}</span>
        <span>mínima R$ {fmt(svg.min)} · máxima R$ {fmt(svg.max)}</span>
        <span>última apuração: {svg.ultimo.data_ref}</span>
      </figcaption>
    </figure>
  );
}

const CotacaoCafePage = () => {
  const refArabica = ARABICA?.data_ref;
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Início", url: SITE_BASE },
    { name: "Cotações", url: `${SITE_BASE}/cotacoes` },
    { name: "Café", url: URL_PAGINA },
  ]);
  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Cotação do café arábica e conilon, indicador CEPEA/ESALQ",
    description:
      "Série diária do indicador do café arábica e do café robusta (conilon) do CEPEA/ESALQ, em reais por saca de 60 kg.",
    url: URL_PAGINA,
    license: "https://creativecommons.org/licenses/by-nc/4.0/",
    creator: { "@type": "Organization", name: "CEPEA/ESALQ", url: DADOS.fonte_url },
    temporalCoverage: "2026-07-10/..",
    distribution: [
      { "@type": "DataDownload", encodingFormat: "application/json",
        contentUrl: `${SITE_BASE}/dados/cotacoes/ultimo.json` },
      { "@type": "DataDownload", encodingFormat: "application/json",
        contentUrl: `${SITE_BASE}/dados/cotacoes/series/cafe-arabica-2026.json` },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ["Qual é o preço do café hoje?",
       `O indicador do café arábica do CEPEA/ESALQ está em R$ ${ARABICA?.valor_fmt} por saca de 60 kg${CONILON ? `, e o do conilon, em R$ ${CONILON.valor_fmt}` : ""}, na apuração de ${refArabica}.`],
      ["Qual é o preço da saca de café de 60 kg?",
       "A saca de 60 kg é a unidade padrão do indicador, então o preço da saca é o próprio valor publicado nesta página."],
      ["Qual a diferença entre café arábica e conilon?",
       "São espécies diferentes, com indicadores apurados em bases diferentes. O arábica é apurado posto na cidade de São Paulo, tipo 6, bebida dura para melhor. O conilon é apurado a retirar na origem, no Espírito Santo, tipo 6, peneira 13 acima."],
      ["Qual a previsão do preço do café para 2026?",
       "Esta página não publica previsão de preço. O que publicamos é apuração: o que foi negociado, quando, e por qual fonte."],
    ].map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Cotação do Café Hoje: Arábica e Conilon, Saca de 60 kg</title>
        <meta
          name="description"
          content="Preço do café arábica e conilon de hoje, direto do indicador CEPEA/ESALQ, com variação do dia, série histórica, conversor de saca para arroba e o que o indicador cobre."
        />
        <link rel="canonical" href={URL_PAGINA} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL_PAGINA} />
        <meta property="og:title" content="Cotação do café hoje: arábica e conilon" />
        <meta
          property="og:description"
          content="Indicador CEPEA/ESALQ do café, com variação do dia, série histórica e conversor de unidade."
        />
        <script type="application/ld+json">{JSON.stringify(datasetLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Head>
      <Navbar />

      {/*
        Layout pelo padrao da casa (CLAUDE.md do site): hero verde, alternancia
        ESTRITA branco/cinza no meio, verde no fim.

        Uma adaptacao deliberada: os cartoes de preco ficam DENTRO do hero
        verde, e nao na primeira secao branca. Numa pagina de dado o numero
        precisa estar acima da dobra, e empurra-lo para baixo do hero custaria
        exatamente a consulta que a pagina existe para responder. Cartao branco
        sobre o gradiente verde resolve os dois: usa o sistema e mantem o
        numero no topo.
      */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <PageHeader
          hero
          overline="Cotações"
          title="Cotação do café hoje"
          description={`Indicador ${DADOS.fonte}, apuração de ${dataPorExtenso(refArabica)}, atualizado às ${horaDe(DADOS.gerado_em)}. Publicado sob licença ${DADOS.licenca}.`}
          breadcrumbs={[
            { label: "Cotações", href: "/cotacoes" },
            { label: "Café" },
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Cartao
              dado={ARABICA}
              titulo="Café arábica"
              detalhe="Bica corrida, tipo 6, bebida dura para melhor, posto na cidade de São Paulo."
            />
            <Cartao
              dado={CONILON}
              titulo="Café conilon (robusta)"
              detalhe="À vista, tipo 6, peneira 13 acima, com 86 defeitos, a retirar na origem, no Espírito Santo."
            />
          </div>
        </div>
      </section>

      {/* ⬜ abertura + conversor */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed">
            O café arábica fechou a {ARABICA?.valor_fmt} reais por saca de 60 kg na última
            apuração do {DADOS.fonte}
            {CONILON ? `, e o conilon, a ${CONILON.valor_fmt}` : ""}. Os dois números são
            indicadores de referência do mercado físico brasileiro, e a seção{" "}
            <a href="#o-que-cobre" className="text-primary underline underline-offset-4">
              o que este número cobre
            </a>{" "}
            explica por que o preço que você recebe na sua praça costuma ser diferente.
          </p>

          <h2 className="mt-12 text-3xl font-bold text-foreground">
            Quanto vale a sua saca hoje
          </h2>
          <p className="mt-2 text-muted-foreground">
            A saca padrão do café tem 60 kg líquidos. Quatro arrobas de 15 kg formam uma saca,
            e uma tonelada equivale a 16 sacas e dois terços.
          </p>
          <div className="mt-6">
            <Conversor />
          </div>
        </div>
      </section>

      {/* 🟫 serie */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground">Como o café se comportou</h2>
          <p className="mt-2 text-muted-foreground">
            A série vem da mesma fonte do número do topo, ponto a ponto, sem suavização. Cada
            ponto é uma apuração do {DADOS.fonte}, e dias sem pregão não aparecem porque não
            existiram.
          </p>
          <div className="mt-8 space-y-8">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Arábica
              </h3>
              <Grafico commodity="cafe-arabica" rotulo="arábica" />
            </div>
            {CONILON ? (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Conilon
                </h3>
                <Grafico commodity="cafe-robusta" rotulo="conilon" />
              </div>
            ) : null}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            As duas séries começam em datas diferentes porque a página da fonte publica apenas
            os últimos 15 pregões: o histórico de cada indicador começa no dia em que passamos
            a guardá-lo.
          </p>
        </div>
      </section>

      {/* ⬜ o diferencial */}
      <section className="py-16 bg-background" id="o-que-cobre">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground">O que o indicador do café cobre</h2>
          <p className="mt-4 leading-relaxed">
            O Indicador do Café Arábica {DADOS.fonte} é, na definição da própria fonte, o preço
            em <strong>reais por saca de 60 kg líquido, bica corrida, tipo 6, bebida dura para
            melhor, valor descontado o Prazo de Pagamento pela taxa CDI, posto na cidade de São
            Paulo</strong>.
          </p>
          <p className="mt-4 leading-relaxed">
            O Indicador do Café Robusta, que o mercado chama de conilon, é apurado em outra
            base: <strong>reais por saca de 60 kg líquido, à vista, tipo 6, peneira 13 acima,
            com 86 defeitos, valor descontado o Prazo de Pagamento pela taxa CDI, a retirar na
            origem (ES)</strong>.
          </p>

          <h2 className="mt-12 text-3xl font-bold text-foreground">O que ele não é</h2>
          <div className="mt-4 space-y-5 leading-relaxed">
            <p className="border-l-4 border-agro pl-4">
              <strong>Não é o preço na sua porteira.</strong> O indicador do arábica é apurado
              posto em São Paulo, ou seja, com o café já entregue na capital. O frete da lavoura
              até lá está dentro do número, e sai do que o produtor recebe.
            </p>
            <p className="border-l-4 border-agro pl-4">
              <strong>Não é o preço do seu lote.</strong> O indicador tem tipo, bebida e peneira
              fixos. Café fora dessa especificação negocia com ágio ou deságio sobre ele.
            </p>
            <p className="border-l-4 border-agro pl-4">
              <strong>Não é o preço de uma praça específica.</strong> Manhuaçu, Varginha,
              Patrocínio, Vitória e Guaxupé têm mercados próprios, com compradores, cooperativas
              e corretoras próprios. Preço de praça é apurado por quem opera naquela praça, e o
              indicador nacional não substitui isso. Quando publicarmos praça aqui, cada linha
              vai dizer de quem é o número.
            </p>
          </div>
        </div>
      </section>

      {/* 🟫 perguntas */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground">Qual é o preço do café hoje?</h2>
          <p className="mt-3 leading-relaxed">
            {ARABICA ? `R$ ${ARABICA.valor_fmt}` : "O indicador"} por saca de 60 kg no arábica
            {CONILON ? ` e R$ ${CONILON.valor_fmt} no conilon` : ""}, pela apuração do{" "}
            {DADOS.fonte} de {refArabica}. O indicador é divulgado em dia útil, com o
            fechamento do pregão anterior.
          </p>

          <h2 className="mt-10 text-3xl font-bold text-foreground">
            Qual é o preço da saca de café de 60 kg?
          </h2>
          <p className="mt-3 leading-relaxed">
            A saca de 60 kg é a unidade padrão do indicador, então o preço da saca é o próprio
            número do topo desta página. Para arroba, quilo ou tonelada, use o conversor.
          </p>

          <h2 className="mt-10 text-3xl font-bold text-foreground">
            Qual a diferença entre café arábica e conilon?
          </h2>
          <p className="mt-3 leading-relaxed">
            São espécies diferentes, com indicadores e bases de apuração diferentes. O arábica é
            apurado posto em São Paulo, tipo 6, bebida dura para melhor. O conilon é apurado a
            retirar na origem, no Espírito Santo, tipo 6, peneira 13 acima. Por isso os dois
            números não são comparáveis linha a linha.
          </p>

          {CONILON ? (
            <>
              <h2 className="mt-10 text-3xl font-bold text-foreground">
                Como fechou o café conilon?
              </h2>
              <p className="mt-3 leading-relaxed">
                R$ {CONILON.valor_fmt} por saca na apuração de {CONILON.data_ref}
                {CONILON.var_pct !== null
                  ? `, com variação de ${fmt(CONILON.var_pct)}% sobre a apuração anterior`
                  : ""}
                .
              </p>
            </>
          ) : null}

          <h2 className="mt-10 text-3xl font-bold text-foreground">
            Qual a previsão do preço do café para 2026?
          </h2>
          <p className="mt-3 leading-relaxed">
            Esta página não publica previsão de preço. O que publicamos é apuração: o que foi
            negociado, quando, e por qual fonte. Projeção de preço de commodity depende de
            safra, clima, câmbio e estoque, e quem a faz assume um risco que não cabe numa
            página de consulta. Para acompanhar o movimento, a série histórica acima mostra o
            caminho que o preço fez.
          </p>

          <h2 className="mt-10 text-3xl font-bold text-foreground">
            Onde vejo o preço na minha região?
          </h2>
          <p className="mt-3 leading-relaxed">
            Por enquanto, nas fontes que apuram cada praça: o Centro do Comércio de Café de
            Vitória para o conilon capixaba, as cooperativas para o preço que elas pagam ao
            cooperado, e as corretoras regionais. Estamos trabalhando para reunir essas fontes
            aqui, com o crédito de cada uma.
          </p>
        </div>
      </section>

      {/* 🟢 fecho verde: o dado aberto E o convite, no lugar do CTA de venda */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Use estes dados</h2>
          <p className="mt-3 text-lg text-white/90">
            Os números desta página estão abertos em JSON, atualizados no mesmo horário.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/90"
              href="/dados/cotacoes/ultimo.json"
            >
              Snapshot do dia
            </a>
            <a
              className="rounded-lg border border-white/70 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              href="/dados/cotacoes/series/cafe-arabica-2026.json"
            >
              Série histórica
            </a>
            <a
              className="rounded-lg border border-white/70 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              href="/dados/cotacoes/fontes.json"
            >
              Fontes e cobertura
            </a>
            <Link
              className="rounded-lg border border-white/70 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              to="/cotacoes"
            >
              Todas as cotações
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Fonte: {DADOS.fonte} (Esalq/USP), licença {DADOS.licenca}. Ao reusar, mantenha o
            crédito.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CotacaoCafePage;
