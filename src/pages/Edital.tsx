import { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, FileText, HelpCircle, List, RefreshCw, Wallet } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ImageHero from "@/components/ImageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getEdital } from "@/data/editais";

// Página de edital (/editais/:slug): guia próprio + cópia integral + planos. Visual no padrão da /editais e das
// páginas do Educa (ImageHero, cabeçalho de seção com ícone, cartões rounded-2xl, faixa final bg-deep). O corpo do
// guia e do texto integral usa as mesmas classes de leitura dos artigos do blog (BlogArticle.tsx).
const PROSA =
  "prose prose-lg max-w-none hyphens-auto [&_p]:text-justify [&_li]:text-justify prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-table:border prose-th:bg-muted prose-th:p-3 prose-td:p-3 prose-td:border prose-th:border [&_table]:block [&_table]:overflow-x-auto [&_[id]]:scroll-mt-24 [&_a[name]]:scroll-mt-24";
const CAIXA = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
const BOTAO_SOL = "inline-flex items-center justify-center gap-2 rounded-full bg-sun text-deep font-bold px-7 py-3.5 hover:brightness-105 transition";
const BOTAO_BORDA_CLARA =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 text-white font-bold px-7 py-3 hover:bg-white hover:text-deep transition";
const BOTAO_ESCURO = "inline-flex items-center justify-center gap-2 rounded-full bg-deep text-white font-bold px-6 py-3 hover:bg-agro transition";
const BOTAO_BORDA = "inline-flex items-center justify-center gap-2 rounded-full border-2 border-border text-foreground font-bold px-6 py-2.5 hover:border-agro hover:text-agro transition";

// Clique num botão de pagamento (Asaas): GA4 begin_checkout com a origem. O WhatsApp é medido pelo medicao-contato.js.
const checkout = (origem: string, plano: string, valor: number) => () => {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  w.gtag?.("event", "begin_checkout", { origem, plano, value: valor, currency: "BRL" });
};

// Páginas sem o quadro da fonte no topo do texto integral (dono, 21/10/2026); a nota do fim, com o link oficial, fica.
const SEM_NOTA_NO_TOPO = ["fapesp-pipe-tecnologias-educacionais"];

const dataBR = (iso: string) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : "");

/** Cabeçalho de seção igual ao da /editais e das trilhas do Educa. */
const Cabecalho = ({ icon: Icon, titulo, apoio, id }: { icon: typeof List; titulo: string; apoio?: string; id?: string }) => (
  <div className="flex items-start gap-4 mb-8">
    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl flex-shrink-0 bg-accent">
      <Icon className="w-7 h-7 text-deep" />
    </div>
    <div>
      <h2 id={id} className="text-3xl font-bold text-foreground mb-1 scroll-mt-24">{titulo}</h2>
      {apoio && <p className="text-lg text-muted-foreground max-w-3xl">{apoio}</p>}
    </div>
  </div>
);

const EditalPage = () => {
  const { slug } = useParams();
  const ed = getEdital(slug);

  // O guia próprio vira uma seção por H2 (fundo alternado, como os artigos)
  const secoes = useMemo(() => (ed?.guiaHtml ? ed.guiaHtml.split(/(?=<h2)/).filter((x) => x.trim()) : []), [ed]);
  const indice = useMemo(() => {
    const itens = [...(ed?.guiaHtml || "").matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)].map((m) => ({ id: m[1], texto: m[2] }));
    itens.push({ id: "planos", texto: "Ajuda para submeter" });
    if (ed?.faq.length) itens.push({ id: "perguntas", texto: "Perguntas frequentes" });
    itens.push({ id: "texto-integral", texto: `Texto integral ${ed?.deTitulo || ""}` });
    return itens;
  }, [ed]);

  if (!ed) return <Navigate to="/editais" replace />;

  const url = `https://cultivee.com.br/editais/${ed.slug}`;
  const og = `${url}/og.png`;
  const wa = `https://wa.me/${ed.whatsapp}?text=${encodeURIComponent(ed.msg)}`;
  const o = `edital-${ed.slug}`;
  let fundo = 0; // alternância branco/cinza das seções depois do topo
  const bg = () => (fundo++ % 2 === 0 ? "bg-background" : "bg-muted");

  return (
    <div className="min-h-screen">
      <Head>
        <title>{ed.tituloSeo}</title>
        <meta name="description" content={ed.descricao} />
        <meta name="robots" content={ed.indexar ? "index, follow, max-snippet:-1" : "noindex, follow"} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={ed.titulo} />
        <meta property="og:description" content={ed.descricao} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={og} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Cultivee" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={og} />
        {ed.jsonld.map((d, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(d)}</script>
        ))}
      </Head>

      <Navbar />

      {/* 1. Topo com foto, chamadas e os números do edital */}
      <ImageHero
        image="/img/site/curso-escrita-projetos.jpg"
        alt="Mesa de madeira com uma pasta de documentos, fichas de anotação e uma muda num vaso"
        eyebrow="Edital FAPESP · texto integral"
        title={ed.titulo}
        subtitle={ed.descricao}
        tall
        aside={
          <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
            <dl className="grid gap-4">
              {ed.fatos.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-bold tracking-[0.12em] uppercase text-sun">{k}</dt>
                  <dd className="text-white font-semibold leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
            {ed.versao && (
              <div className="mt-5 pt-4 border-t border-white/20 flex items-center gap-2 text-sm text-white/80">
                <RefreshCw className="w-4 h-4" />
                <time dateTime={ed.versao}>Atualizado em {dataBR(ed.versao)}</time>
              </div>
            )}
          </div>
        }
      >
        <a href={ed.linkDiagnostico} target="_blank" rel="noopener" data-origem={`${o}-topo`}
          onClick={checkout(`${o}-topo`, "consultoria-avulsa", 250)} className={BOTAO_SOL}>
          Agendar meu Diagnóstico de Prontidão
        </a>
        <a href={ed.oficial} target="_blank" rel="noopener" className={BOTAO_BORDA_CLARA}>
          Edital no site da FAPESP <ExternalLink className="w-4 h-4" />
        </a>
      </ImageHero>

      {/* 2. Preâmbulo: volta para a lista, nota do diagnóstico e índice */}
      <section className={`py-12 ${bg()}`}>
        <div className={CAIXA}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link to="/editais" className="inline-flex items-center gap-2 text-sm font-bold text-deep hover:text-agro">
              <ArrowLeft className="w-4 h-4" /> Todos os editais abertos
            </Link>
            <span className="text-sm text-muted-foreground">Texto oficial da FAPESP de {ed.atualizada}</span>
          </div>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 items-start">
            <div className="rounded-2xl border-2 border-sun/60 bg-sun/10 p-6">
              <div className="text-xs font-bold tracking-[0.14em] uppercase text-deep mb-2">Diagnóstico de Prontidão</div>
              <p className="text-foreground mb-4">
                1 hora de consultoria (R$ 250, Pix ou cartão em até 12x). Você sai sabendo se o seu projeto cabe neste
                edital, o que está forte e o que falta.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={ed.linkDiagnostico} target="_blank" rel="noopener" data-origem={`${o}-preambulo`}
                  onClick={checkout(`${o}-preambulo`, "consultoria-avulsa", 250)} className={BOTAO_ESCURO}>
                  Agendar o diagnóstico <ArrowRight className="w-4 h-4" />
                </a>
                <a href={wa} target="_blank" rel="noopener" data-origem={`${o}-whatsapp`} className={BOTAO_BORDA}>
                  Tirar uma dúvida no WhatsApp
                </a>
              </div>
            </div>
            <nav aria-label="Índice" className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <List className="w-5 h-5 text-agro" />
                <span className="font-bold text-foreground text-sm uppercase tracking-wider">Nesta página</span>
              </div>
              <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {indice.map((h, idx) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="flex items-start gap-2 text-muted-foreground hover:text-agro transition-colors group">
                      <span className="text-xs font-bold text-agro/70 mt-1 min-w-[1.5rem]">{String(idx + 1).padStart(2, "0")}</span>
                      <span className="group-hover:underline underline-offset-2">{h.texto}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* 3. Guia próprio, uma seção por H2 (fundo alternado, leitura igual à dos artigos) */}
      {secoes.map((html, idx) => (
        <section key={idx} className={`py-12 ${bg()}`}>
          <div className={CAIXA}>
            <div lang="pt-BR" className={`${PROSA} prose-h2:text-3xl`} dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </section>
      ))}

      {/* 4. Planos (logo depois do guia) */}
      <section className={`py-16 ${bg()}`}>
        <div className={CAIXA}>
          <Cabecalho
            id="planos"
            icon={Wallet}
            titulo="Quer submeter com segurança?"
            apoio="Sou pesquisador, avaliador de projetos e participei de 18 financiamentos aprovados. Leio a sua proposta antes dos pareceristas e te digo onde está forte e onde está frágil, com tempo de corrigir."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border-2 border-sun bg-card p-6 flex flex-col gap-2 shadow-elegant">
              <span className="self-start px-3 py-1 bg-sun text-deep text-xs font-bold rounded-full">Comece por aqui</span>
              <h3 className="text-xl font-bold text-foreground mt-1">Diagnóstico de Prontidão</h3>
              <span className="text-3xl font-bold text-deep">R$ 250</span>
              <p className="text-muted-foreground flex-1">
                1 hora de consultoria: leio o seu projeto ou a sua ideia, digo se cabe neste edital e o que falta.
              </p>
              <a href={ed.linkDiagnostico} target="_blank" rel="noopener" data-origem={`${o}-diagnostico`}
                onClick={checkout(`${o}-diagnostico`, "consultoria-avulsa", 250)} className={`${BOTAO_SOL} mt-2`}>
                Agendar o diagnóstico <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            {ed.plano && (
              <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
                <span className="self-start px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">Mentoria</span>
                <h3 className="text-xl font-bold text-foreground mt-1">{ed.plano.nome}</h3>
                <span className="text-3xl font-bold text-deep">{ed.plano.preco}</span>
                <p className="text-muted-foreground flex-1">{ed.plano.desc}</p>
                <a href={ed.plano.link} target="_blank" rel="noopener" data-origem={`${o}-plano`}
                  onClick={checkout(`${o}-plano`, ed.plano.chave, ed.plano.valor)} className={`${BOTAO_ESCURO} mt-2`}>
                  Quero esta mentoria <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
              <span className="self-start px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">Todos os planos</span>
              <h3 className="text-xl font-bold text-foreground mt-1">Mentoria</h3>
              <p className="text-muted-foreground flex-1">Acompanhamento completo, preços fixos e garantia sobre o meu trabalho.</p>
              <a href={ed.venda} data-origem={`${o}-planos`} className={`${BOTAO_BORDA} mt-2`}>
                {ed.vendaRotulo} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Perguntas frequentes (mesmo acordeão do Educa) */}
      {ed.faq.length > 0 && (
        <section className={`py-16 ${bg()}`}>
          <div className={CAIXA}>
            <Cabecalho id="perguntas" icon={HelpCircle} titulo={`Perguntas frequentes sobre o ${ed.tituloCurto.replace(/ \(.*\)/, "")}`} />
            <Accordion type="multiple" className="space-y-4">
              {ed.faq.map(([q, r], i) => (
                <AccordionItem
                  key={q}
                  value={`p-${i}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-elegant transition-shadow"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline">{q}</AccordionTrigger>
                  <AccordionContent forceMount className="text-muted-foreground data-[state=closed]:hidden">{r}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* 6. Texto integral do edital */}
      <section className={`py-16 ${bg()}`}>
        <div className={CAIXA}>
          <Cabecalho id="texto-integral" icon={FileText} titulo={`Texto integral ${ed.deTitulo} (cópia da FAPESP)`} />
          {!SEM_NOTA_NO_TOPO.includes(ed.slug) && (
          <aside className="flex gap-3 rounded-2xl border border-border bg-card p-5 mb-10 text-sm text-muted-foreground">
            <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5 text-agro" />
            <p>
              Cópia integral do texto publicado pela FAPESP em{" "}
              <a href={ed.oficial} target="_blank" rel="noopener" className="font-semibold text-agro underline break-all">{ed.oficial}</a>{" "}
              (página atualizada em {ed.atualizada}). Tiramos só os menus do site da FAPESP; o texto não foi alterado. Antes de
              submeter, confira sempre a versão no site da FAPESP: as regras e as datas podem mudar.
            </p>
          </aside>
          )}
          <div lang="pt-BR" className={PROSA} dangerouslySetInnerHTML={{ __html: ed.integralHtml }} />
          {/* Nota no fim do texto integral (pedido do dono, 21/10/2026) */}
          <aside className="mt-12 flex gap-3 rounded-2xl border border-border bg-card p-5 text-muted-foreground">
            <ExternalLink className="w-5 h-5 flex-shrink-0 mt-0.5 text-agro" />
            <p>
              Para mais informações, é necessário consultar o edital no site da FAPESP:{" "}
              <a href={ed.oficial} target="_blank" rel="noopener" className="font-semibold text-agro underline break-all">{ed.oficial}</a>
            </p>
          </aside>
        </div>
      </section>

      {/* 7. Faixa final verde-escura, como na /editais */}
      <section className="bg-deep py-16">
        <div className={`${CAIXA} grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center`}>
          <div>
            <div className="text-xs md:text-sm font-bold tracking-[0.14em] uppercase text-sun mb-3">Diagnóstico de Prontidão</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Seu projeto está pronto para o edital?</h2>
            <p className="text-lg text-white/80 max-w-2xl">
              Comece pelo Diagnóstico de Prontidão: 1 hora de consultoria (R$ 250) em que eu leio o seu caso e te digo, com
              honestidade, se e como posso ajudar.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <a href={ed.linkDiagnostico} target="_blank" rel="noopener" data-origem={`${o}-final`}
              onClick={checkout(`${o}-final`, "consultoria-avulsa", 250)} className={BOTAO_SOL}>
              Agendar meu Diagnóstico de Prontidão
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" data-origem={`${o}-whatsapp-final`} className={BOTAO_BORDA_CLARA}>
              Falar no WhatsApp
            </a>
          </div>
        </div>
        <p className={`${CAIXA} text-xs text-white/50 mt-10`}>
          O texto do edital é da FAPESP (Fundação de Amparo à Pesquisa do Estado de São Paulo), reproduzido com a fonte. A
          Cultivee não tem vínculo com a FAPESP e não influencia a avaliação das propostas.
        </p>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default EditalPage;
