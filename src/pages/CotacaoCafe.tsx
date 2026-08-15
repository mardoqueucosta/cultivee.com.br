import { useEffect, useMemo, useState } from "react";
import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PageHeader } from "@/components/blog/PageHeader";
import { SITE_BASE, breadcrumbJsonLd } from "@/lib/breadcrumb-schema";
import {
  COTACOES, type ItemCotacao, dataPorExtenso, fmt, horaDe, itemPorKey, resumoDe,
} from "@/lib/cotacoes";

/**
 * Pagina ancora da cotacao do cafe.
 *
 * Contrato de conteudo: `07-cotacoes-site/conteudo/cotacoes-cafe.md`.
 * Arquitetura de ancora e spokes: §6.3 e §6.4 do CLAUDE.md daquele projeto.
 *
 * DUAS REGRAS QUE NAO PODEM SER QUEBRADAS AQUI:
 *
 * 1. NENHUM NUMERO ESCRITO A MAO. Tudo sai do `ultimo.json`, que a rotina
 *    diaria de coleta grava. Numero no JSX envelhece em um dia e passa a
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

/**
 * Vocabulario da cotacao. Esta na pagina ANCORA de proposito: e' o que explica
 * por que dois numeros do mesmo dia divergem, e essa e' a pergunta da ancora.
 * A especificacao COMPLETA de cada tipo pertence aos spokes (§6.4).
 */
const GLOSSARIO = [
  {
    termo: "Saca de 60 kg",
    oque: "A unidade padrão do café no Brasil: 60 quilos líquidos de café beneficiado.",
    efeito: "É a base de toda cotação daqui. Bolsa de Nova York cota em centavo de dólar por libra-peso.",
  },
  {
    termo: "Bica corrida",
    oque: "Café beneficiado como saiu do maquinário, sem separação por peneira ou por tipo.",
    efeito: "É a especificação do indicador. Café já classificado vale mais que bica corrida.",
  },
  {
    termo: "Tipo (2 a 8)",
    oque: "Classificação por número de defeitos numa amostra de 300 g. Quanto menor o número, menos defeito.",
    efeito: "Cada tipo acima vale mais. É por isso que existe cotação de tipo 6 e de tipo 7 separadas.",
  },
  {
    termo: "Bebida",
    oque: "Classificação sensorial da xícara: estritamente mole, mole, apenas mole, dura, riada, rio.",
    efeito: "Vale para o arábica. Bebida dura para cima é o café de mercado; riado e rio pagam menos.",
  },
  {
    termo: "Peneira",
    oque: "Tamanho do grão, medido em furos de peneira (17, 16, 15…).",
    efeito: "Grão graúdo torra mais uniforme e tem prêmio. Peneira 17 acima é referência de café fino.",
  },
  {
    termo: "Arroba",
    oque: "15 quilos. Aparece em negócio no interior e em contrato de parceria.",
    efeito: "Quatro arrobas fazem uma saca — divida a cotação por 4 para chegar ao valor da arroba.",
  },
];

/**
 * Extremos das NOSSAS series. Dado proprio: a pagina do Cepea publica os
 * ultimos pregoes e substitui os antigos, entao "maxima do periodo" so existe
 * para quem arquivou. Gerado por `07-cotacoes-site/atualiza_dados.py`.
 */
const SERIES_CAFE = [
  { rotulo: "Café arábica", r: resumoDe("cafe-arabica") },
  { rotulo: "Café conilon (robusta)", r: resumoDe("cafe-robusta") },
].filter((s): s is { rotulo: string; r: NonNullable<typeof s.r> } => Boolean(s.r));

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
  // ⚠️ `breadcrumbJsonLd` JA acrescenta o "Início" na posicao 1 e monta a URL a
  // partir de `href` RELATIVO. Passar `{name, url}` absoluto rendia "Início"
  // duplicado e tres `item` valendo "https://cultivee.com.brundefined".
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Cotações", href: "/cotacoes" },
    { name: "Café", href: "/cotacoes/cafe" },
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
      ["Como a cotação de Nova York vira preço em real?",
       "Não é uma multiplicação pelo dólar. A cotação é convertida para real e ajustada por um diferencial de origem e de praça. No contrato Coffee C da ICE, o café brasileiro entra com deságio fixo de 600 pontos sobre a referência, contra prêmio de 1.000 pontos da Colômbia. Depois entram o diferencial da praça e o desconto de prazo de pagamento pela taxa CDI."],
      ["Safra recorde derruba ou levanta o preço do café?",
       "Em geral derruba. Mais oferta pressiona o preço para baixo, e os boletins do CEPEA registraram esse movimento quando o avanço da colheita reduziu os indicadores."],
      ["Qual a previsão do preço do café para 2026?",
       "Esta página não publica previsão de preço. O que publicamos é apuração: o que foi negociado, quando, e por qual fonte."],
      ["Qual o preço da arroba de café?",
       `A arroba tem 15 kg e a saca, 60: quatro arrobas fazem uma saca. A arroba do café arábica sai a R$ ${ARABICA ? fmt(ARABICA.valor / 4) : "—"}${CONILON ? `, e a do conilon, a R$ ${fmt(CONILON.valor / 4)}` : ""}, pela apuração de ${refArabica}.`],
      ["Quanto o produtor recebe pela saca de café?",
       "Quase sempre menos que o indicador. O número apurado é a média de negócios com uma especificação definida; um lote específico sai dele com abatimentos por tipo, bebida, umidade, frete, prazo de pagamento e classificação na recepção. Café acima da especificação pode receber prêmio. O indicador é referência de negociação, não valor garantido de venda."],
      ["Por que a cotação de hoje é a do dia anterior?",
       "Porque o indicador só fecha depois que o dia de negócios acaba. O CEPEA apura os negócios do dia útil e divulga no fim da tarde, então pela manhã o número mais recente é o do dia útil anterior. Na segunda-feira, é o de sexta."],
      ["O que significa bica corrida na cotação do café?",
       "Bica corrida é o café beneficiado como saiu do maquinário, sem separação por peneira ou por tipo. É a especificação do indicador publicado nesta página. Café já classificado costuma valer mais que bica corrida, e é por isso que a cotação de uma cooperativa raramente coincide com o indicador."],
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
              indicador nacional não substitui isso. Todo número publicado aqui diz de quem é.
            </p>
          </div>
        </div>
      </section>

      {/*
        🟫 como o preco se forma.
        Vem do dossie `o-que-move-o-preco-do-cafe-no-brasil-como-a-cotacao-se-forma.md`
        (00-pesquisa/claude-cli-pesquisa), auditado em 14/08/2026: DOI e relatorio
        USDA conferidos na fonte. E' o bloco que responde, sem prever preco, a
        demanda por "perspectiva do preco para 2026" que o people_also_ask repete.
      */}
      <section className="py-16 bg-muted" id="como-se-forma">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground">Como o preço do café se forma</h2>
          <p className="mt-4 leading-relaxed">
            O número do topo desta página não nasce numa praça só. Ele desce um funil de
            camadas, e cada uma tem regra própria: a bolsa internacional define a expectativa
            em dólar, o câmbio converte, o indicador nacional apura o que foi negociado no
            mercado físico brasileiro, e o diferencial local ajusta para a qualidade e a
            distância do lote de verdade.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">
                As camadas que formam o preço do café no Brasil
              </caption>
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th scope="col" className="px-4 py-3 font-semibold">Camada</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Onde</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Unidade</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">O que ela capta</th>
                </tr>
              </thead>
              <tbody className="[&>tr>td]:py-3 [&>tr>td]:pr-4 [&>tr>td:first-child]:px-4 [&>tr]:border-b [&>tr]:border-border [&>tr:last-child]:border-0">
                <tr>
                  <td className="font-medium">Bolsa internacional</td>
                  <td>ICE Nova York (arábica) e Londres (robusta)</td>
                  <td className="whitespace-nowrap">¢US/lb e US$/t</td>
                  <td>expectativa global de oferta e demanda</td>
                </tr>
                <tr>
                  <td className="font-medium">Câmbio</td>
                  <td>mercado doméstico</td>
                  <td className="whitespace-nowrap">R$ por US$</td>
                  <td>converte a bolsa para real</td>
                </tr>
                <tr>
                  <td className="font-medium">Bolsa doméstica</td>
                  <td>B3, contrato Café Arábica 4/5</td>
                  <td className="whitespace-nowrap">US$/saca</td>
                  <td>hedge no mercado local, com entrega física</td>
                </tr>
                <tr>
                  <td className="font-medium">Indicador físico</td>
                  <td>CEPEA/ESALQ</td>
                  <td className="whitespace-nowrap">R$/saca de 60 kg</td>
                  <td>o que foi negociado de fato no Brasil</td>
                </tr>
                <tr>
                  <td className="font-medium">Diferencial local</td>
                  <td>praça do lote</td>
                  <td className="whitespace-nowrap">ágio ou deságio</td>
                  <td>tipo, bebida, peneira, certificação e frete</td>
                </tr>
                <tr>
                  <td className="font-medium">Piso de política</td>
                  <td>Preço Mínimo, PGPM</td>
                  <td className="whitespace-nowrap">R$/saca</td>
                  <td>rede de segurança, só atua abaixo do mínimo</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-xl font-bold text-foreground">
            O café brasileiro entra na bolsa com deságio
          </h3>
          <p className="mt-3 leading-relaxed">
            O contrato Coffee C da ICE aceita café de várias origens, com prêmio ou desconto
            fixo sobre a referência. A Colômbia entra com prêmio de 1.000 pontos, a Guatemala
            com 500, e o <strong>Brasil com deságio de 600 pontos</strong>. Não é julgamento de
            qualidade: é o reconhecimento, dentro da regra do contrato, de que o café brasileiro
            é predominantemente natural e de bica corrida, enquanto a referência do contrato são
            os lavados centro-americanos. Fonte: especificação do Coffee C Futures, ICE.
          </p>
          <p className="mt-3 leading-relaxed">
            Por isso a conta popular de multiplicar a cotação de Nova York pelo dólar não bate
            com o indicador brasileiro. Entre uma coisa e outra existem o deságio de origem, o
            diferencial da praça e o desconto de prazo de pagamento pela taxa CDI, que o CEPEA
            aplica na apuração.
          </p>

          <h3 className="mt-10 text-xl font-bold text-foreground">
            Três leituras erradas que aparecem toda semana
          </h3>
          <div className="mt-4 space-y-4 leading-relaxed">
            <p className="border-l-4 border-agro pl-4">
              <strong>Safra recorde faz o preço subir.</strong> Costuma ser o contrário. Mais
              oferta pressiona o preço para baixo, e os boletins do CEPEA registraram
              exatamente isso quando o avanço da colheita derrubou os indicadores.
            </p>
            <p className="border-l-4 border-agro pl-4">
              <strong>Arábica e conilon são o mesmo mercado.</strong> Têm bolsas de referência
              diferentes, Nova York e Londres, praças físicas diferentes, São Paulo e Espírito
              Santo, e substituem um ao outro em parte: quando o arábica encarece demais, a
              indústria aumenta o uso de robusta.
            </p>
            <p className="border-l-4 border-agro pl-4">
              <strong>O indicador é o preço do café.</strong> Ele é a média de negócios com
              características específicas. O café de um produtor pode valer mais ou menos que
              ele, e a diferença tem nome: tipo, bebida, peneira e frete.
            </p>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Fontes desta seção: CEPEA/ESALQ, ICE (especificação do Coffee C Futures), B3 (ficha
            do contrato Café Arábica 4/5), CONAB (Preço Mínimo da safra 2026/27) e Cooxupé.
            Literatura consultada: Cunha (2010) e Silveira, Cruz Júnior e Saes (2012), Revista
            de Economia e Sociologia Rural.
          </p>
        </div>
      </section>

      {/* ⬜ glossario */}
      <section className="py-16 bg-background" id="glossario">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground">
            Como ler uma cotação de café
          </h2>
          <p className="mt-3 leading-relaxed">
            Toda cotação de café vem com uma especificação junto, e é ela que explica por que
            dois números do mesmo dia não batem. Sem esses termos, comparar preço de origens
            diferentes é comparar coisas diferentes.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Termo</th>
                  <th className="px-4 py-3 text-left font-semibold">O que significa</th>
                  <th className="px-4 py-3 text-left font-semibold">Por que muda o preço</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {GLOSSARIO.map((g) => (
                  <tr key={g.termo}>
                    <th scope="row" className="px-4 py-3 text-left font-semibold align-top">
                      {g.termo}
                    </th>
                    <td className="px-4 py-3 align-top">{g.oque}</td>
                    <td className="px-4 py-3 align-top text-muted-foreground">{g.efeito}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            O indicador do CEPEA que esta página publica é <strong>bica corrida</strong>, em
            saca de 60 kg limpos, posto em armazém. Cotação de cooperativa costuma ser de café
            já classificado, e por isso quase nunca coincide com ele.
          </p>
        </div>
      </section>

      {/* 🟫 nossa serie */}
      <section className="py-16 bg-muted" id="nossa-serie">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground">
            Máxima, mínima e amplitude da nossa série
          </h2>
          <p className="mt-3 leading-relaxed">
            Estes números saem da série que este site guarda, não de terceiros. A página do
            CEPEA publica os últimos pregões e substitui os antigos; nós arquivamos cada
            apuração em <a href="/dados/cotacoes/" className="text-agro underline">arquivo por
            ano</a>, então dá para dizer qual foi o teto e o piso do período inteiro.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-background">
            <table className="w-full text-sm">
              <caption className="sr-only">
                Extremos das séries de café arábica e conilon apuradas pelo Cultivee
              </caption>
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Indicador</th>
                  <th className="px-4 py-3 text-right font-semibold">Mínima</th>
                  <th className="px-4 py-3 text-right font-semibold">Máxima</th>
                  <th className="px-4 py-3 text-right font-semibold">Amplitude</th>
                  <th className="px-4 py-3 text-right font-semibold">Pontos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SERIES_CAFE.map(({ rotulo, r }) => (
                  <tr key={rotulo}>
                    <th scope="row" className="px-4 py-3 text-left font-medium">{rotulo}</th>
                    <td className="px-4 py-3 text-right tabular-nums">
                      R$ {fmt(r.minimo)}
                      <span className="block text-xs text-muted-foreground">{r.minimo_em}</span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      R$ {fmt(r.maximo)}
                      <span className="block text-xs text-muted-foreground">{r.maximo_em}</span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {r.amplitude_pct === null ? "—" : `${fmt(r.amplitude_pct)}%`}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{r.pontos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Amplitude é a distância entre a mínima e a máxima, em percentual da mínima. Série
            curta: os extremos valem para o período coberto, e não são máxima e mínima
            históricas do café.
          </p>

          <h3 className="mt-12 text-2xl font-bold text-foreground">Quando cada número sai</h3>
          <p className="mt-3 leading-relaxed">
            O CEPEA apura em dia útil e divulga o fechamento do pregão no fim da tarde. Por
            isso, o número que você lê pela manhã é o do <strong>dia útil anterior</strong>, e
            na segunda-feira ele ainda é o de sexta.
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-5 leading-relaxed">
            <li>
              <strong>Apuração:</strong> dia útil, com os negócios daquele dia no mercado
              físico.
            </li>
            <li>
              <strong>Nesta página:</strong> atualizamos todos os dias, inclusive sábado e
              domingo, para que o fechamento de sexta já esteja aqui antes da segunda.
            </li>
            <li>
              <strong>Feriado e fim de semana:</strong> não há pregão, o indicador não avança e
              esta página mantém a última apuração, com a data dela visível.
            </li>
          </ul>
        </div>
      </section>

      {/* ⬜ perguntas */}
      <section className="py-16 bg-background">
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
            Como a cotação de Nova York vira preço em real?
          </h2>
          <p className="mt-3 leading-relaxed">
            Não é uma multiplicação pelo dólar. A cotação da bolsa é convertida para real e
            então ajustada por um diferencial de origem e de praça. No contrato Coffee C da
            ICE, o café brasileiro entra com deságio fixo de 600 pontos sobre a referência,
            contra prêmio de 1.000 pontos da Colômbia. Depois disso ainda entram o diferencial
            da praça onde o lote está e o desconto de prazo de pagamento pela taxa CDI, que o
            CEPEA aplica na apuração.
          </p>

          <h2 className="mt-10 text-3xl font-bold text-foreground">
            Safra recorde derruba ou levanta o preço do café?
          </h2>
          <p className="mt-3 leading-relaxed">
            Em geral derruba. Mais oferta pressiona o preço para baixo, e os boletins do CEPEA
            registraram esse movimento quando o avanço da colheita reduziu os indicadores. A
            leitura contrária, de que safra grande valoriza o produto, é uma das confusões mais
            repetidas sobre cotação agrícola.
          </p>

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
            Qual o preço da arroba de café?
          </h2>
          <p className="mt-3 leading-relaxed">
            A arroba tem 15 quilos, e a saca, 60: quatro arrobas fazem uma saca. Então a arroba
            do arábica sai a{" "}
            {ARABICA ? <strong>R$ {fmt(ARABICA.valor / 4)}</strong> : "um quarto do indicador"}
            {CONILON ? <> e a do conilon, a <strong>R$ {fmt(CONILON.valor / 4)}</strong></> : null}
            , pela apuração de {refArabica}. O conversor acima faz a conta para qualquer
            quantidade.
          </p>

          <h2 className="mt-10 text-3xl font-bold text-foreground">
            Quanto o produtor recebe pela saca?
          </h2>
          <p className="mt-3 leading-relaxed">
            Menos que o indicador, quase sempre. O número apurado é uma média de negócios no
            mercado físico com uma especificação definida, e o preço de um lote específico sai
            dele com abatimentos: tipo e bebida abaixo da referência, umidade, frete até o
            armazém comprador, prazo de pagamento e a classificação feita na recepção. Quem
            entrega café melhor que a especificação pode receber acima. O indicador serve de
            <strong> referência para negociar</strong>, não de valor garantido de venda.
          </p>

          <h2 className="mt-10 text-3xl font-bold text-foreground">
            Por que a cotação de hoje é a de ontem?
          </h2>
          <p className="mt-3 leading-relaxed">
            Porque o indicador só fecha depois que o dia de negócios acaba. O CEPEA apura os
            negócios do dia útil e divulga no fim da tarde, então pela manhã o número mais
            recente que existe é o do dia útil anterior. Na segunda-feira, ele é o de sexta.
            Qualquer página que mostre um preço de café "de hoje" às oito da manhã está
            mostrando o fechamento anterior — a diferença é declarar isso ou não.
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
