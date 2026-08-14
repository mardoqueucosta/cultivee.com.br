import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <header>
          <h1 className="text-3xl font-bold sm:text-4xl">Cotações agrícolas hoje</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Indicadores {COTACOES.fonte}, apuração de {dataPorExtenso(refDiaria)}, atualizado
            às {horaDe(COTACOES.gerado_em)}. Publicado sob licença {COTACOES.licenca}.
          </p>
        </header>

        <section className="mt-8">
          <h2 className="sr-only">Painel de indicadores diários</h2>
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
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
        </section>

        {mensais.length ? (
          <section className="mt-8">
            <h2 className="text-xl font-bold">Indicadores mensais</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Apurados uma vez por mês e divulgados com defasagem. Não são movimento do dia, e
              por isso ficam fora do painel acima.
            </p>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full min-w-[34rem] text-left">
                <tbody className="[&>tr>td:first-child]:px-4">
                  {mensais.map((i) => <Linha key={i.key} i={i} />)}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        <section className="mt-12">
          <h2 className="text-2xl font-bold">O que são estes números</h2>
          <p className="mt-3 leading-relaxed">
            São indicadores de referência do mercado físico brasileiro, apurados pelo{" "}
            {COTACOES.fonte} e publicados em dia útil, com o fechamento do pregão anterior.
            Cada indicador tem uma especificação própria de tipo, qualidade e praça, e a data
            de apuração é por linha, não do painel: o que é diário se move todo dia, o que é
            mensal não.
          </p>
          <p className="mt-3 leading-relaxed">
            Indicador de referência não é o preço da sua porteira nem o do seu lote. A página
            de cada commodity explica o que o número dela cobre e o que não cobre.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">Páginas por commodity</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Onde há página própria, com especificação, série histórica e conversor.
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/cotacoes/cafe" className="font-medium underline underline-offset-4">
                Cotação do café
              </Link>
              <span className="text-sm text-muted-foreground">
                {" "}arábica e conilon, com conversor de saca e série histórica
              </span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Os demais indicadores aparecem no painel acima e ainda não têm página própria.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-border bg-muted/40 p-6">
          <h2 className="text-2xl font-bold">Use estes dados</h2>
          <p className="mt-2 leading-relaxed">
            O painel inteiro está disponível em JSON, atualizado no mesmo horário:
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <a className="underline underline-offset-4" href="/dados/cotacoes/ultimo.json">
                /dados/cotacoes/ultimo.json
              </a>
            </li>
            <li>
              <a className="underline underline-offset-4" href="/dados/cotacoes/fontes.json">
                /dados/cotacoes/fontes.json
              </a>
              <span className="text-muted-foreground"> fontes, licença e cobertura</span>
            </li>
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Fonte: {COTACOES.fonte} (Esalq/USP), licença {COTACOES.licenca}. Ao reusar,
            mantenha o crédito.
          </p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CotacoesPage;
