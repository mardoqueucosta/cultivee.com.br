import { useEffect, useMemo, useState } from "react";
import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import {
  AlertTriangle, ArrowRight, BookOpen, CalendarClock, ChevronDown, ExternalLink, Hourglass, Landmark, RefreshCw,
  Sparkles, Infinity as Continuo,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ImageHero from "@/components/ImageHero";
import { SITE_BASE, breadcrumbJsonLd } from "@/lib/breadcrumb-schema";
import {
  LISTA, type ItemEdital, dataBR, diaDe, faltam, grupoAbrangencia, hojeLocal, porPrazo,
} from "@/lib/editais-lista";

/**
 * /editais: lista de editais de fomento abertos, lida de public/dados/editais/editais.json (atualizado toda
 * segunda-feira pela busca de editais, contrato em captacao-recursos/busca-editais/SITE-PAGINA-EDITAIS.md).
 * Nada de número, órgão ou data escrito aqui: tudo sai do JSON. O HTML do build traz a lista completa (SEO);
 * no navegador, a data de hoje esconde o que venceu e recalcula "faltam N dias" e o bloco de 7 dias.
 * Visual no padrão das páginas do Educa (ImageHero, cabeçalho de seção com ícone, cartões rounded-2xl).
 */

const URL_PAGINA = `${SITE_BASE}/editais`;
const CAIXA = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
const TITULO = "Editais de fomento abertos";
const DESCRICAO = `Editais abertos com recurso não reembolsável para empresas${
  LISTA ? ` (${LISTA.orgaos.slice(0, 6).join(", ")} e outros)` : ""
}, por órgão e por prazo, com o link do edital oficial e filtro para quem é MEI. Atualizada toda segunda-feira.`;

// Grupo com muitas chamadas e público restrito (aviso de `restricao`, hoje a Petrobras): vem recolhido (o conteúdo continua no HTML).
const RECOLHER_A_PARTIR_DE = 10;
const ancora = (o: string) => "orgao-" + o.normalize("NFD").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** Bloco da data à esquerda do cartão (dia grande, mês embaixo), como uma folhinha. */
const Folhinha = ({ iso, urgente, rotulo }: { iso: string | null; urgente?: boolean; rotulo?: string }) => (
  <div
    className={`flex-shrink-0 w-16 rounded-xl text-center py-2 ${
      urgente ? "bg-sun text-deep" : iso ? "bg-accent text-deep" : "bg-muted text-muted-foreground"
    }`}
  >
    {iso ? (
      <>
        <div className="text-2xl font-bold leading-none">{iso.slice(8, 10)}</div>
        <div className="text-xs font-bold uppercase tracking-wide mt-1">{MESES[+iso.slice(5, 7) - 1]}</div>
        <div className="text-[10px] opacity-70">{iso.slice(0, 4)}</div>
      </>
    ) : (
      <>
        <Continuo className="w-6 h-6 mx-auto" />
        <div className="text-[10px] font-bold uppercase leading-tight mt-1">{rotulo}</div>
      </>
    )}
  </div>
);

const Selo = ({ children, cor }: { children: React.ReactNode; cor: string }) => (
  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${cor}`}>{children}</span>
);

const Cartao = ({ e, hoje }: { e: ItemEdital; hoje: string }) => {
  const dias = e.prazo ? diaDe(e.prazo) - diaDe(hoje) : null;
  const urgente = dias !== null && dias <= 7;
  return (
    <li
      id={e.id}
      className="group bg-card rounded-2xl border border-border p-5 flex gap-4 scroll-mt-28 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elegant"
    >
      <Folhinha iso={e.prazo} urgente={urgente} rotulo={e.fluxo_continuo ? "contínuo" : "conferir"} />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {e.prazo ? (
            <Selo cor={urgente ? "bg-sun/30 text-deep" : "bg-primary/10 text-primary"}>
              <Hourglass className="w-3 h-3" /> {faltam(e.prazo, hoje)}
            </Selo>
          ) : (
            <Selo cor="bg-muted text-muted-foreground">{e.fluxo_continuo ? "fluxo contínuo" : "prazo no edital"}</Selo>
          )}
          {e.novo && (
            <Selo cor="bg-deep text-white">
              <Sparkles className="w-3 h-3" /> novo
            </Selo>
          )}
          {e.mei === true && (
            <span title={e.mei_regra || undefined}>
              <Selo cor="bg-secondary/10 text-secondary">aceita MEI</Selo>
            </span>
          )}
          <span className="text-xs text-muted-foreground ml-1">{e.orgao}</span>
        </div>
        <h3 className="font-bold text-foreground leading-snug">
          <a href={e.url} target="_blank" rel="noopener nofollow" className="hover:text-agro transition-colors">
            {e.titulo}
            <ExternalLink className="inline w-3.5 h-3.5 ml-1 -mt-0.5 text-muted-foreground group-hover:text-agro" />
          </a>
        </h3>
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <div><dt className="inline">Recurso: </dt><dd className="inline font-medium text-foreground">{e.recurso || "conferir no edital"}</dd></div>
          <div><dt className="inline">Contrapartida: </dt><dd className="inline font-medium text-foreground">{e.contrapartida || "conferir no edital"}</dd></div>
          <div><dt className="inline">Abrangência: </dt><dd className="inline font-medium text-foreground">{e.abrangencia || "conferir no edital"}</dd></div>
        </dl>
        {e.restricao && (
          <p className="mt-3 flex gap-2 rounded-lg bg-amber-50 text-amber-900 px-3 py-2 text-sm">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            {e.restricao}
          </p>
        )}
        {e.guia_cultivee && (
          <Link
            to={e.guia_cultivee.url.replace(/^https?:\/\/[^/]+/, "").replace(/\/$/, "")}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-deep hover:text-agro"
          >
            <BookOpen className="w-4 h-4" /> Ler o guia da Cultivee <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </li>
  );
};

/** Cabeçalho de seção igual ao das trilhas do Educa: ícone num quadrado, título e uma linha de apoio. */
const Cabecalho = ({ icon: Icon, titulo, apoio, destaque }: { icon: typeof Landmark; titulo: string; apoio: string; destaque?: boolean }) => (
  <div className="flex items-start gap-4 mb-8">
    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl flex-shrink-0 ${destaque ? "bg-sun" : "bg-accent"}`}>
      <Icon className="w-7 h-7 text-deep" />
    </div>
    <div>
      <h2 className="text-3xl font-bold text-foreground mb-1">{titulo}</h2>
      <p className="text-lg text-muted-foreground max-w-3xl">{apoio}</p>
    </div>
  </div>
);

const EditaisPage = () => {
  // No build (e no 1º desenho do navegador) a referência é a data da lista; depois, a data de hoje de quem lê.
  const [hoje, setHoje] = useState(LISTA?.atualizado_em ?? "2000-01-01");
  const [soMei, setSoMei] = useState(false);
  const [orgao, setOrgao] = useState("");
  const [abrang, setAbrang] = useState("");
  useEffect(() => setHoje(hojeLocal()), []);

  const abrangencias = useMemo(
    () =>
      [...new Set((LISTA?.editais ?? []).map((e) => grupoAbrangencia(e.abrangencia)))].sort((a, b) =>
        a === "Nacional" ? -1 : b === "Nacional" ? 1 : a.localeCompare(b, "pt-BR"),
      ),
    [],
  );

  const vigentes = useMemo(() => (LISTA?.editais ?? []).filter((e) => !e.prazo || e.prazo >= hoje), [hoje]);
  const visiveis = vigentes.filter(
    (e) =>
      (!soMei || e.secoes?.includes("mei")) &&
      (!orgao || e.orgao === orgao) &&
      (!abrang || grupoAbrangencia(e.abrangencia) === abrang),
  );
  const fechaLogo = (e: ItemEdital) => !!e.prazo && diaDe(e.prazo) - diaDe(hoje) <= 7;
  const seteDias = visiveis.filter(fechaLogo).sort(porPrazo);
  const ordemOrgaos = LISTA
    ? [...LISTA.orgaos, ...new Set(LISTA.editais.map((e) => e.orgao).filter((o) => !LISTA.orgaos.includes(o)))]
    : [];
  const grupos = ordemOrgaos
    .map((o) => ({ orgao: o, itens: visiveis.filter((e) => e.orgao === o).sort(porPrazo) }))
    .filter((g) => g.itens.length > 0);
  const previstos = (LISTA?.previstos ?? []).filter((p) => !p.lancamento || p.lancamento >= hoje);
  const filtrando = soMei || orgao || abrang;

  const numeros = [
    { n: vigentes.length, rotulo: "editais abertos" },
    { n: vigentes.filter(fechaLogo).length, rotulo: "fecham em 7 dias" },
    { n: vigentes.filter((e) => e.secoes?.includes("mei")).length, rotulo: "aceitam MEI" },
    { n: new Set(vigentes.map((e) => e.orgao)).size, rotulo: "órgãos" },
  ];

  const breadcrumbLd = breadcrumbJsonLd([{ name: "Editais", href: "/editais" }]);
  const paginaLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITULO,
    description: DESCRICAO,
    url: URL_PAGINA,
    inLanguage: "pt-BR",
    ...(LISTA ? { dateModified: LISTA.atualizado_em } : {}),
    publisher: { "@type": "Organization", name: "Cultivee", url: SITE_BASE },
  };

  const pilula = (ativa: boolean) =>
    `inline-flex items-center gap-2 h-10 rounded-full border px-4 text-sm font-semibold transition-colors ${
      ativa ? "bg-deep border-deep text-white" : "bg-background border-border text-foreground hover:border-agro"
    }`;
  const select = "h-10 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground hover:border-agro";
  let fundo = 0; // alternância branco/cinza das seções depois do topo
  const bg = () => (fundo++ % 2 === 0 ? "bg-background" : "bg-muted");

  return (
    <div className="min-h-screen">
      <Head>
        <title>{`${TITULO} para empresas | Cultivee`}</title>
        <meta name="description" content={DESCRICAO} />
        <link rel="canonical" href={URL_PAGINA} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITULO} />
        <meta property="og:description" content={DESCRICAO} />
        <meta property="og:url" content={URL_PAGINA} />
        <meta property="og:image" content={`${SITE_BASE}/img/site/curso-escrita-projetos.jpg`} />
        <meta property="og:site_name" content="Cultivee" />
        <meta property="og:locale" content="pt_BR" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(paginaLd)}</script>
      </Head>

      <Navbar />

      <ImageHero
        image="/img/site/curso-escrita-projetos.jpg"
        alt="Mesa de madeira com uma pasta de documentos, fichas de anotação e uma muda num vaso"
        eyebrow="Cultivee Educa · Fomento"
        title={TITULO}
        subtitle="Dinheiro não reembolsável para empresas, separado por órgão e por prazo, cada edital com o link oficial. A lista é refeita toda segunda-feira."
        aside={
          LISTA && (
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <div className="grid grid-cols-2 gap-5">
                {numeros.map((x) => (
                  <div key={x.rotulo}>
                    <div className="text-4xl font-bold text-sun leading-none">{x.n}</div>
                    <div className="text-sm text-white/80 mt-1">{x.rotulo}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/20 flex items-center gap-2 text-sm text-white/80">
                <RefreshCw className="w-4 h-4" />
                <time dateTime={LISTA.atualizado_em}>Atualizada em {dataBR(LISTA.atualizado_em)}</time>
              </div>
            </div>
          )
        }
      >
        {LISTA && (
          <>
            <a
              href={seteDias.length ? "#fecham-em-7-dias" : "#lista"}
              className="inline-flex items-center justify-center rounded-full bg-sun text-deep font-bold px-7 py-3.5 hover:brightness-105 transition"
            >
              {seteDias.length ? "Ver os que fecham em 7 dias" : "Ver a lista"}
            </a>
            <a
              href="/fomento"
              data-origem="editais-lista-topo"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/70 text-white font-bold px-7 py-3 hover:bg-white hover:text-deep transition"
            >
              Ajuda para submeter
            </a>
          </>
        )}
      </ImageHero>

      {!LISTA ? (
        <section className="bg-background py-20">
          <div className={`${CAIXA} text-center`}>
            <RefreshCw className="w-10 h-10 mx-auto mb-4 text-agro" />
            <h2 className="text-3xl font-bold text-foreground mb-2">Lista em atualização</h2>
            <p className="text-lg text-muted-foreground">A lista de editais está sendo refeita. Volte em alguns minutos.</p>
          </div>
        </section>
      ) : (
        <>
          {/* Filtros: barra presa no topo ao rolar (só a partir do tablet; no celular ocuparia meia tela) */}
          <div id="lista" className="relative sm:sticky sm:top-16 z-30 bg-background/95 backdrop-blur border-b border-border scroll-mt-16">
            <div className={`${CAIXA} py-3 flex flex-wrap items-center gap-2`}>
              <button type="button" aria-pressed={soMei} onClick={() => setSoMei(!soMei)} className={pilula(soMei)}>
                Aceita MEI
              </button>
              <select aria-label="Órgão" value={orgao} onChange={(e) => setOrgao(e.target.value)} className={select}>
                <option value="">Todos os órgãos</option>
                {ordemOrgaos
                  .filter((o) => vigentes.some((e) => e.orgao === o))
                  .map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
              </select>
              <select aria-label="Abrangência" value={abrang} onChange={(e) => setAbrang(e.target.value)} className={select}>
                <option value="">Toda abrangência</option>
                {abrangencias.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              {filtrando && (
                <button type="button" onClick={() => { setSoMei(false); setOrgao(""); setAbrang(""); }} className="text-sm font-semibold text-agro underline px-2">
                  Limpar
                </button>
              )}
              <span className="text-sm text-muted-foreground ml-auto">{visiveis.length} na lista</span>
            </div>
          </div>

          {/* Atalhos por órgão */}
          <section className={`py-8 ${bg()}`}>
            <div className={CAIXA}>
              {LISTA.criterio_fomento && (
                <p className="text-muted-foreground mb-5 max-w-4xl">Entram na lista editais com {LISTA.criterio_fomento}.</p>
              )}
              <nav aria-label="Órgãos" className="flex flex-wrap gap-2">
                {grupos.map((g) => (
                  <a
                    key={g.orgao}
                    href={`#${ancora(g.orgao)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-agro hover:text-agro transition-colors"
                  >
                    {g.orgao}
                    <span className="rounded-full bg-accent text-deep text-xs px-2 py-0.5">{g.itens.length}</span>
                  </a>
                ))}
                {previstos.length > 0 && (
                  <a href="#previstos" className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-agro hover:text-agro transition-colors">
                    Previstos
                    <span className="rounded-full bg-muted text-muted-foreground text-xs px-2 py-0.5">{previstos.length}</span>
                  </a>
                )}
              </nav>
            </div>
          </section>

          {seteDias.length > 0 && (
            <section id="fecham-em-7-dias" className={`py-16 scroll-mt-32 ${bg()}`}>
              <div className={CAIXA}>
                <Cabecalho icon={Hourglass} titulo="Fecham em até 7 dias" apoio="Todos os órgãos, pela data de encerramento." destaque />
                <ul className="grid lg:grid-cols-2 gap-4">
                  {seteDias.map((e) => <Cartao key={e.id} e={e} hoje={hoje} />)}
                </ul>
              </div>
            </section>
          )}

          {grupos.length === 0 && (
            <section className={`py-16 ${bg()}`}>
              <div className={`${CAIXA} text-center text-lg text-muted-foreground`}>Nenhum edital aberto com esses filtros.</div>
            </section>
          )}

          {grupos.map((g) => {
            const restricao = g.itens.find((e) => e.restricao)?.restricao;
            const recolher = !!restricao && g.itens.length >= RECOLHER_A_PARTIR_DE && !orgao;
            const n = g.itens.length;
            const lista = (
              <ul className="grid lg:grid-cols-2 gap-4">
                {g.itens.map((e) => <Cartao key={e.id} e={e} hoje={hoje} />)}
              </ul>
            );
            return (
              <section key={g.orgao} id={ancora(g.orgao)} className={`py-16 scroll-mt-32 ${bg()}`}>
                <div className={CAIXA}>
                  <Cabecalho
                    icon={Landmark}
                    titulo={g.orgao}
                    apoio={`${n} ${n === 1 ? "edital aberto" : "editais abertos"}, por prazo${
                      g.itens.some((e) => !e.prazo) ? "; os de fluxo contínuo no fim" : ""
                    }.`}
                  />
                  {recolher ? (
                    <>
                      <p className="flex gap-2 rounded-xl bg-amber-50 text-amber-900 p-4 mb-5 text-sm max-w-4xl">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                        {restricao}
                      </p>
                      <details className="group/rec">
                        <summary className="cursor-pointer list-none inline-flex items-center gap-2 rounded-full bg-deep text-white px-6 py-3 text-sm font-bold hover:bg-agro transition-colors">
                          Ver as {n} chamadas
                          <ChevronDown className="w-4 h-4 transition-transform group-open/rec:rotate-180" />
                        </summary>
                        <div className="mt-6">{lista}</div>
                      </details>
                    </>
                  ) : (
                    lista
                  )}
                </div>
              </section>
            );
          })}

          {previstos.length > 0 && (
            <section id="previstos" className={`py-16 scroll-mt-32 ${bg()}`}>
              <div className={CAIXA}>
                <Cabecalho icon={CalendarClock} titulo="Previstos" apoio="Anunciados pelo órgão, ainda sem inscrição aberta." />
                <ul className="grid lg:grid-cols-2 gap-4">
                  {previstos.map((p) => (
                    <li key={p.titulo} className="bg-card rounded-2xl border border-dashed border-border p-5 flex gap-4">
                      <Folhinha iso={p.lancamento} rotulo="sem data" />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          <Selo cor="bg-muted text-muted-foreground">
                            {p.lancamento ? `lançamento previsto em ${dataBR(p.lancamento)}` : "lançamento sem data"}
                          </Selo>
                          <span className="text-xs text-muted-foreground ml-1">{p.orgao}</span>
                        </div>
                        <a href={p.url} target="_blank" rel="noopener nofollow" className="font-bold text-foreground hover:text-agro transition-colors">
                          {p.titulo}
                          <ExternalLink className="inline w-3.5 h-3.5 ml-1 -mt-0.5 text-muted-foreground" />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </>
      )}

      {/* Faixa final verde-escura, como as faixas do Educa */}
      <section className="bg-deep py-16">
        <div className={`${CAIXA} grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center`}>
          <div>
            <div className="text-xs md:text-sm font-bold tracking-[0.14em] uppercase text-sun mb-3">Diagnóstico de Prontidão</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Achou um edital para o seu projeto?</h2>
            <p className="text-lg text-white/80 max-w-2xl">
              Em uma hora de consultoria eu leio o seu caso e digo se ele cabe no edital, o que está forte e o que falta,
              com tempo de corrigir antes do prazo.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <a
              href="/fomento"
              data-origem="editais-lista-final"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sun text-deep font-bold px-7 py-3.5 hover:brightness-105 transition"
            >
              Conhecer o Diagnóstico <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <p className={`${CAIXA} text-xs text-white/50 mt-10`}>
          Lista de triagem feita pela Cultivee a partir das páginas oficiais. A Cultivee não tem vínculo com os órgãos de
          fomento e não influencia a avaliação das propostas.
        </p>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default EditaisPage;
