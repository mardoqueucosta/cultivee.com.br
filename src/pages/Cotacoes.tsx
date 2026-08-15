import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PageHeader } from "@/components/blog/PageHeader";
import { SITE_BASE, breadcrumbJsonLd } from "@/lib/breadcrumb-schema";
import {
  COTACOES, FONTES, NOME_EXIBICAO, PAGINA_DO_INDICADOR, dataPorExtenso, fmt,
  horaDe, nomeDe,
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

  // ⚠️ Ver a nota em CotacaoCafe.tsx: o helper ja poe o "Início" e monta a URL
  // a partir de `href` RELATIVO.
  const breadcrumbLd = breadcrumbJsonLd([{ name: "Cotações", href: "/cotacoes" }]);
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

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ["O que é uma cotação agrícola?",
       `É o preço de referência de uma commodity num mercado e num momento. No Brasil, a referência mais usada do mercado físico são os indicadores do ${COTACOES.fonte}, publicados por unidade padrão: saca de 60 kg para grãos e café, arroba para o boi, tonelada para o trigo e litro para o leite.`],
      ["Qual a diferença entre cotação e preço pago ao produtor?",
       "A cotação é uma média de negócios com tipo, qualidade e praça de referência fixos. O preço pago a um produtor soma ou subtrai dessa referência conforme a qualidade do lote, o volume, o prazo de pagamento e o frete."],
      ["Por que a cotação de hoje mostra o fechamento de ontem?",
       "Porque o indicador do dia só é apurado e divulgado no fim da tarde. Pela manhã, o dado mais recente que existe é o fechamento anterior."],
      ["Posso usar estes dados no meu site ou trabalho?",
       `Os números são do ${COTACOES.fonte}, sob licença ${COTACOES.licenca}, que exige atribuição e restringe uso comercial. O JSON é aberto para consulta e estudo, com a fonte declarada.`],
      ["Vocês publicam previsão de preço?",
       "Não. Publicamos apuração: o que foi negociado, quando e por qual fonte."],
    ].map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
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
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
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

      {/* ⬜ cobertura declarada: o que cada indicador e, e o que NAO cobrimos */}
      <section className="py-16 bg-background" id="cobertura">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground">O que cada indicador cobre</h2>
          <p className="mt-2 text-muted-foreground">
            Unidade, periodicidade e desde quando guardamos a série de cada um. A
            especificação completa de tipo e qualidade fica na página do indicador na fonte.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">
                Cobertura por indicador: unidade, periodicidade, início da série e fonte
              </caption>
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th scope="col" className="px-4 py-3 font-semibold">Indicador</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Unidade</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Periodicidade</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Série desde</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Pontos</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Fonte</th>
                </tr>
              </thead>
              <tbody className="[&>tr>td]:py-3 [&>tr>td]:pr-4 [&>tr>td:first-child]:px-4 [&>tr]:border-b [&>tr]:border-border [&>tr:last-child]:border-0">
                {FONTES.indicadores.map((i) => (
                  <tr key={i.key}>
                    <td className="font-medium">
                      {NOME_EXIBICAO[i.key] || i.nome}
                      {i.detalhe ? (
                        <span className="block text-xs text-muted-foreground">{i.detalhe}</span>
                      ) : null}
                    </td>
                    <td className="whitespace-nowrap">{i.moeda} por {i.unidade}</td>
                    <td>{i.periodicidade === "mensal" ? "mensal" : "diária, em dia útil"}</td>
                    <td className="whitespace-nowrap tabular-nums">{i.serie_desde || "s/ série"}</td>
                    <td className="tabular-nums">{i.pontos_na_serie}</td>
                    <td>
                      <a className="underline underline-offset-4" href={i.pagina_fonte}
                         rel="noopener noreferrer" target="_blank">
                        CEPEA
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            As séries começam em datas diferentes porque a página da fonte publica apenas os
            últimos 15 pregões: o histórico de cada indicador começa no dia em que passamos a
            guardá-lo, e cresce a partir daí.
          </p>

          <h3 className="mt-10 text-xl font-bold text-foreground">O que ainda não cobrimos</h3>
          <p className="mt-2 text-muted-foreground">
            Dizer o que falta é parte de publicar dado. Estas são as lacunas conhecidas:
          </p>
          <ul className="mt-4 space-y-3">
            {FONTES.nao_coberto.map((n) => (
              <li key={n.commodity} className="border-l-4 border-agro pl-4">
                <strong>{n.commodity}</strong>
                <span className="block text-muted-foreground">{n.motivo}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 text-xl font-bold text-foreground">Quando cada número sai</h3>
          <p className="mt-3 leading-relaxed">
            Os indicadores diários são apurados no fim da tarde e divulgados na mesma noite,
            então o número que aparece aqui de manhã é o <strong>fechamento do pregão
            anterior</strong>. Na segunda-feira, o painel carrega o fechamento de sexta, e isso
            não é dado velho: é o dado vigente, porque não houve pregão no fim de semana. O
            leite é <strong>mensal</strong> e sai com um a dois meses de defasagem, por isso a
            data de referência aparece por linha e não no topo da tabela.
          </p>
          <p className="mt-3 leading-relaxed">
            Esta página é reconstruída todo dia, e a hora da última apuração fica no alto. Se
            o número não mudou de um dia para o outro, é porque a fonte não avançou.
          </p>
        </div>
      </section>

      {/* 🟫 perguntas */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground">
            O que é uma cotação agrícola?
          </h2>
          <p className="mt-3 leading-relaxed">
            É o preço de referência de uma commodity num mercado e num momento. No Brasil, a
            referência mais usada do mercado físico são os indicadores do {COTACOES.fonte},
            que apuram diariamente o preço médio negociado entre agentes do setor e o publicam
            por unidade padrão: saca de 60 kg para grãos e café, arroba para o boi, tonelada
            para o trigo e litro para o leite.
          </p>

          <h2 className="mt-10 text-3xl font-bold text-foreground">
            Qual a diferença entre cotação e preço pago ao produtor?
          </h2>
          <p className="mt-3 leading-relaxed">
            A cotação é uma média de negócios com características definidas: tipo, qualidade e
            praça de referência fixos. O preço pago a um produtor específico soma ou subtrai
            dessa referência conforme a qualidade do lote, o volume, o prazo de pagamento e o
            frete até o ponto de entrega. Por isso duas propriedades vizinhas podem receber
            valores diferentes no mesmo dia.
          </p>

          <h2 className="mt-10 text-3xl font-bold text-foreground">
            Por que a cotação de hoje mostra o fechamento de ontem?
          </h2>
          <p className="mt-3 leading-relaxed">
            Porque o indicador do dia só é apurado e divulgado no fim da tarde. Um painel
            publicado de manhã com "o número de hoje" estaria inventando: o pregão do dia ainda
            não terminou. O que existe de mais recente pela manhã é o fechamento anterior, e é
            ele que aparece aqui, com a data ao lado.
          </p>

          <h2 className="mt-10 text-3xl font-bold text-foreground">
            Posso usar estes dados no meu site ou trabalho?
          </h2>
          <p className="mt-3 leading-relaxed">
            Os números são do {COTACOES.fonte} e estão sob licença {COTACOES.licenca}, que
            exige atribuição e restringe uso comercial. Nós publicamos o JSON aberto para
            consulta e estudo, sempre com a fonte declarada. Ao reusar, mantenha o crédito e
            verifique as condições diretamente com a fonte.
          </p>

          <h2 className="mt-10 text-3xl font-bold text-foreground">
            Vocês publicam previsão de preço?
          </h2>
          <p className="mt-3 leading-relaxed">
            Não. O que publicamos é apuração: o que foi negociado, quando e por qual fonte.
            Projeção de preço de commodity depende de safra, clima, câmbio e estoque, e quem a
            faz assume um risco que não cabe numa página de consulta. Para entender o que move
            os números, a página de cada commodity explica a formação de preço.
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
