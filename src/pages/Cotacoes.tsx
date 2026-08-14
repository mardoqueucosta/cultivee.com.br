import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PageHeader } from "@/components/blog/PageHeader";
import { SITE_BASE, breadcrumbJsonLd } from "@/lib/breadcrumb-schema";
import {
  COTACOES, PAGINA_DO_INDICADOR, dataPorExtenso, fmt, horaDe, nomeDe,
} from "@/lib/cotacoes";

/**
 * Indice de `/cotacoes`: o painel de TODOS os indicadores que o site publica.
 *
 * DIVISAO DE CONTEUDO (contrato na §6.4 do CLAUDE.md do projeto 07):
 * esta pagina responde "cotacoes agricolas hoje" com uma linha por indicador e
 * ROTEIA para as paginas proprias. Ela NAO repete nada do que e' especifico de
 * uma commodity: especificacao, conversor, serie e metodologia moram na pagina
 * daquela commodity. Repetir aqui seria criar duas paginas dizendo a mesma
 * coisa, que e' exatamente como este site ja perdeu artigos para o Google.
 */

const URL_PAGINA = `${SITE_BASE}/cotacoes`;

const CotacoesPage = () => {
  const diarios = COTACOES.itens.filter((i) => i.periodicidade !== "mensal");
  const mensais = COTACOES.itens.filter((i) => i.periodicidade === "mensal");
  const refDiaria = diarios[0]?.data_ref;

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Início", url: SITE_BASE },
    { name: "Cotações", url: URL_PAGINA },
  ]);
  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Cotações agrícolas diárias, indicadores CEPEA/ESALQ",
    description:
      "Painel diário dos indicadores CEPEA/ESALQ de boi gordo, café arábica, café robusta (conilon), soja, milho, trigo e leite.",
    url: URL_PAGINA,
    license: "https://creativecommons.org/licenses/by-nc/4.0/",
    creator: { "@type": "Organization", name: COTACOES.fonte, url: COTACOES.fonte_url },
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/json",
        contentUrl: `${SITE_BASE}/dados/cotacoes/ultimo.json`,
      },
    ],
  };

  const Linha = ({ i }: { i: (typeof COTACOES.itens)[number] }) => {
    const pagina = PAGINA_DO_INDICADOR[i.key];
    const sobe = (i.var_pct ?? 0) > 0;
    const desce = (i.var_pct ?? 0) < 0;
    return (
      <tr className="border-b border-border last:border-0">
        <td className="py-3 pr-4">
          {pagina ? (
            <Link to={pagina} className="font-medium underline underline-offset-4">
              {nomeDe(i)}
            </Link>
          ) : (
            <span className="font-medium">{nomeDe(i)}</span>
          )}
          {i.detalhe ? (
            <span className="block text-xs text-muted-foreground">{i.detalhe}</span>
          ) : null}
        </td>
        <td className="py-3 pr-4 text-right font-semibold tabular-nums whitespace-nowrap">
          {i.moeda} {i.valor_fmt}
        </td>
        <td className="py-3 pr-4 text-xs text-muted-foreground whitespace-nowrap">
          por {i.unidade}
        </td>
        <td className="py-3 pr-4 text-right text-sm tabular-nums whitespace-nowrap">
          {i.var_pct === null ? (
            <span className="text-muted-foreground">s/ referência</span>
          ) : (
            <span className={sobe ? "text-emerald-600" : desce ? "text-red-600" : "text-muted-foreground"}>
              {sobe ? "▲" : desce ? "▼" : "="} {fmt(Math.abs(i.var_pct))}%
            </span>
          )}
        </td>
        <td className="py-3 text-right text-xs text-muted-foreground whitespace-nowrap">
          {i.ref_rotulo || i.data_ref}
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Cotações Agrícolas Hoje: Boi, Café, Soja, Milho, Trigo e Leite</title>
        <meta
          name="description"
          content="Painel diário das cotações agrícolas com os indicadores CEPEA/ESALQ: boi gordo, café arábica e conilon, soja, milho, trigo e leite, com a variação do dia e a data de apuração de cada um."
        />
        <link rel="canonical" href={URL_PAGINA} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL_PAGINA} />
        <meta property="og:title" content="Cotações agrícolas hoje" />
        <meta
          property="og:description"
          content="Indicadores CEPEA/ESALQ de boi, café, soja, milho, trigo e leite, com variação do dia."
        />
        <script type="application/ld+json">{JSON.stringify(datasetLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Head>
      <Navbar />

      {/* 🟢 hero: identidade da casa + a procedencia junto do titulo */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <PageHeader
          hero
          overline="Dado diário"
          title="Cotações agrícolas hoje"
          description={`Indicadores ${COTACOES.fonte}, apuração de ${dataPorExtenso(refDiaria)}, atualizado às ${horaDe(COTACOES.gerado_em)}. Publicado sob licença ${COTACOES.licenca}.`}
          breadcrumbs={[{ label: "Cotações" }]}
        />
      </section>

      {/* ⬜ o painel */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Painel de indicadores diários</h2>
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full min-w-[34rem] text-left">
              <caption className="sr-only">
                Indicadores diários com valor, unidade, variação e data de apuração
              </caption>
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th scope="col" className="px-4 py-3 font-semibold">Indicador</th>
                  <th scope="col" className="py-3 pr-4 text-right font-semibold">Valor</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Unidade</th>
                  <th scope="col" className="py-3 pr-4 text-right font-semibold">No dia</th>
                  <th scope="col" className="py-3 text-right font-semibold">Apuração</th>
                </tr>
              </thead>
              <tbody className="[&>tr>td:first-child]:px-4">
                {diarios.map((i) => <Linha key={i.key} i={i} />)}
              </tbody>
            </table>
          </div>

          {mensais.length ? (
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-foreground">Indicadores mensais</h2>
              <p className="mt-2 text-muted-foreground">
                Apurados uma vez por mês e divulgados com defasagem. Não são movimento do dia,
                e por isso ficam fora do painel acima.
              </p>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
                <table className="w-full min-w-[34rem] text-left">
                  <tbody className="[&>tr>td:first-child]:px-4">
                    {mensais.map((i) => <Linha key={i.key} i={i} />)}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 🟫 o que sao estes numeros */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground">O que são estes números</h2>
          <p className="mt-4 leading-relaxed">
            São indicadores de referência do mercado físico brasileiro, apurados pelo{" "}
            {COTACOES.fonte} e publicados em dia útil, com o fechamento do pregão anterior.
            Cada indicador tem uma especificação própria de tipo, qualidade e praça, e a data
            de apuração é por linha, não do painel: o que é diário se move todo dia, o que é
            mensal não.
          </p>
          <p className="mt-4 border-l-4 border-agro pl-4 leading-relaxed">
            Indicador de referência não é o preço da sua porteira nem o do seu lote. A página
            de cada commodity explica o que o número dela cobre e o que não cobre.
          </p>
        </div>
      </section>

      {/* ⬜ paginas por commodity */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground">Páginas por commodity</h2>
          <p className="mt-2 text-muted-foreground">
            Onde há página própria, com especificação, série histórica e conversor.
          </p>
          <div className="mt-6">
            <Link
              to="/cotacoes/cafe"
              className="block rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-agro"
            >
              <span className="text-xl font-bold text-foreground">Cotação do café</span>
              <span className="mt-1 block text-muted-foreground">
                Arábica e conilon, com a especificação de cada indicador, conversor de saca e
                série histórica.
              </span>
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Os demais indicadores aparecem no painel acima e ainda não têm página própria.
          </p>
        </div>
      </section>

      {/* 🟢 fecho verde: o dado aberto */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Use estes dados</h2>
          <p className="mt-3 text-lg text-white/90">
            O painel inteiro está aberto em JSON, atualizado no mesmo horário.
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
              href="/dados/cotacoes/fontes.json"
            >
              Fontes e cobertura
            </a>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Fonte: {COTACOES.fonte} (Esalq/USP), licença {COTACOES.licenca}. Ao reusar,
            mantenha o crédito.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CotacoesPage;
