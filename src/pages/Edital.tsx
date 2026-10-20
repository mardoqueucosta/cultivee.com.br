import { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { RefreshCw, List, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/blog/PageHeader";
import { getEdital } from "@/data/editais";

// Mesmas classes do corpo dos artigos do blog (BlogArticle.tsx), para o edital ter o mesmo padrão de leitura
const PROSA =
  "prose prose-lg max-w-none hyphens-auto [&_p]:text-justify [&_li]:text-justify prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-table:border prose-th:bg-muted prose-th:p-3 prose-td:p-3 prose-td:border prose-th:border [&_table]:block [&_table]:overflow-x-auto [&_[id]]:scroll-mt-24 [&_a[name]]:scroll-mt-24";
const CAIXA = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

// Clique num botão de pagamento (Asaas): GA4 begin_checkout com a origem. O WhatsApp é medido pelo medicao-contato.js.
const checkout = (origem: string, plano: string, valor: number) => () => {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  w.gtag?.("event", "begin_checkout", { origem, plano, value: valor, currency: "BRL" });
};

const dataBR = (iso: string) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : "");

const EditalPage = () => {
  const { slug } = useParams();
  const ed = getEdital(slug);

  // O guia próprio vira uma seção por H2 (fundo alternado, como os artigos)
  const secoes = useMemo(() => (ed?.guiaHtml ? ed.guiaHtml.split(/(?=<h2)/).filter((x) => x.trim()) : []), [ed]);
  const indice = useMemo(() => {
    const itens = [...(ed?.guiaHtml || "").matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)].map((m) => ({ id: m[1], texto: m[2] }));
    if (ed?.faq.length) itens.push({ id: "perguntas", texto: "Perguntas frequentes" });
    itens.push({ id: "texto-integral", texto: `Texto integral ${ed?.deTitulo || ""}` });
    return itens;
  }, [ed]);

  if (!ed) return <Navigate to="/fomento" replace />;

  const url = `https://cultivee.com.br/editais/${ed.slug}`;
  const og = `${url}/og.png`;
  const wa = `https://wa.me/${ed.whatsapp}?text=${encodeURIComponent(ed.msg)}`;
  const o = `edital-${ed.slug}`;
  const blocos = secoes.length + (ed.faq.length ? 1 : 0); // para alternar o fundo depois do guia

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

      {/* 1. Hero verde */}
      <section className="bg-gradient-hero">
        <PageHeader
          overline="Edital FAPESP · texto integral"
          title={ed.titulo}
          description={ed.descricao}
          centered
          accent="educa"
          hero
          breadcrumbs={[{ label: "Fomento", href: "/fomento" }, { label: ed.tituloCurto }]}
        />
      </section>

      {/* 2. Preâmbulo: data, números do edital, chamadas e índice */}
      <section className="bg-background py-10">
        <div className={CAIXA}>
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-border text-xs">
            {ed.versao && (
              <span className="flex items-center gap-1.5 font-medium text-primary">
                <RefreshCw className="w-3.5 h-3.5" />
                <time dateTime={ed.versao}>Atualizado em {dataBR(ed.versao)}</time>
              </span>
            )}
            <span className="text-muted-foreground">Texto oficial da FAPESP de {ed.atualizada}</span>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
            {ed.fatos.map(([k, v]) => (
              <li key={k} className="rounded-xl border border-border bg-muted/40 p-4">
                <span className="block text-xs text-muted-foreground">{k}</span>
                <span className="font-semibold text-foreground">{v}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <Button asChild size="lg" className="font-semibold">
              <a href={ed.linkDiagnostico} target="_blank" rel="noopener" data-origem={`${o}-topo`}
                onClick={checkout(`${o}-topo`, "consultoria-avulsa", 250)}>
                Agendar meu Diagnóstico de Prontidão <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={ed.oficial} target="_blank" rel="noopener">
                Ver o edital no site da FAPESP <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Diagnóstico de Prontidão: 1 hora de consultoria (R$ 250, Pix ou cartão em até 12x). Você sai sabendo se o seu
            projeto cabe neste edital, o que está forte e o que falta.{" "}
            <a href={wa} target="_blank" rel="noopener" data-origem={`${o}-whatsapp`} className="text-primary underline">
              Prefiro tirar uma dúvida no WhatsApp
            </a>
            .
          </p>

          <nav aria-label="Índice" className="rounded-xl border border-border bg-muted/40 p-6">
            <div className="flex items-center gap-2 mb-4">
              <List className="w-5 h-5 text-muted-foreground" />
              <span className="font-bold text-foreground text-sm uppercase tracking-wider">Nesta página</span>
            </div>
            <ol className="space-y-2">
              {indice.map((h, idx) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors group">
                    <span className="text-xs font-mono text-muted-foreground/60 mt-0.5 min-w-[1.5rem]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="group-hover:underline underline-offset-2">{h.texto}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* 3. Guia próprio, uma seção por H2 (fundo alternado) */}
      {secoes.map((html, idx) => (
        <section key={idx} className={`py-8 ${idx % 2 === 0 ? "bg-muted" : "bg-background"}`}>
          <div className={CAIXA}>
            <div lang="pt-BR" className={PROSA} dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </section>
      ))}

      {/* 4. Planos (logo depois do guia) */}
      <section className={`py-10 ${secoes.length % 2 === 0 ? "bg-muted" : "bg-background"}`}>
        <div className={CAIXA}>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Quer submeter com segurança?</h2>
          <p className="text-muted-foreground mb-6">
            Sou pesquisador, avaliador de projetos e participei de 18 financiamentos aprovados. Leio a sua proposta antes
            dos pareceristas e te digo onde está forte e onde está frágil, com tempo de corrigir.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border-2 border-primary/40 bg-primary/5 p-5 flex flex-col gap-2">
              <span className="font-semibold text-primary">Diagnóstico de Prontidão</span>
              <span className="text-3xl font-bold text-foreground">R$ 250</span>
              <p className="text-sm text-muted-foreground flex-1">
                1 hora de consultoria: leio o seu projeto ou a sua ideia, digo se cabe neste edital e o que falta.
              </p>
              <Button asChild className="font-semibold">
                <a href={ed.linkDiagnostico} target="_blank" rel="noopener" data-origem={`${o}-diagnostico`}
                  onClick={checkout(`${o}-diagnostico`, "consultoria-avulsa", 250)}>
                  Agendar o diagnóstico <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>
            {ed.plano && (
              <div className="rounded-xl border border-border bg-background p-5 flex flex-col gap-2">
                <span className="font-semibold text-primary">{ed.plano.nome}</span>
                <span className="text-3xl font-bold text-foreground">{ed.plano.preco}</span>
                <p className="text-sm text-muted-foreground flex-1">{ed.plano.desc}</p>
                <Button asChild variant="outline">
                  <a href={ed.plano.link} target="_blank" rel="noopener" data-origem={`${o}-plano`}
                    onClick={checkout(`${o}-plano`, ed.plano.chave, ed.plano.valor)}>
                    Quero esta mentoria <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
            )}
            <div className="rounded-xl border border-border bg-background p-5 flex flex-col gap-2">
              <span className="font-semibold text-primary">Todos os planos</span>
              <span className="text-3xl font-bold text-foreground">Mentoria</span>
              <p className="text-sm text-muted-foreground flex-1">Acompanhamento completo, preços fixos e garantia sobre o meu trabalho.</p>
              <Button asChild variant="outline">
                <a href={ed.venda} data-origem={`${o}-planos`}>
                  {ed.vendaRotulo} <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Perguntas frequentes */}
      {ed.faq.length > 0 && (
        <section id="perguntas" className={`py-10 scroll-mt-24 ${secoes.length % 2 === 0 ? "bg-background" : "bg-muted"}`}>
          <div className={CAIXA}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Perguntas frequentes sobre o {ed.tituloCurto.replace(/ \(.*\)/, "")}</h2>
            <div className="divide-y divide-border border-y border-border">
              {ed.faq.map(([q, r]) => (
                <details key={q} className="py-4 group">
                  <summary className="cursor-pointer font-semibold text-foreground list-none flex justify-between gap-4">
                    {q}
                    <span className="text-primary group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-2 text-muted-foreground">{r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Texto integral do edital */}
      <section id="texto-integral" className={`py-10 scroll-mt-24 ${(blocos + 1) % 2 === 0 ? "bg-muted" : "bg-background"}`}>
        <div className={CAIXA}>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Texto integral {ed.deTitulo} (cópia da FAPESP)</h2>
          <aside className="flex gap-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 p-4 mb-8 text-sm">
            <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>
              Cópia integral do texto publicado pela FAPESP em{" "}
              <a href={ed.oficial} target="_blank" rel="noopener" className="font-semibold underline break-all">{ed.oficial}</a>{" "}
              (página atualizada em {ed.atualizada}). Tiramos só os menus do site da FAPESP; o texto não foi alterado. Antes de
              submeter, confira sempre a versão no site da FAPESP: as regras e as datas podem mudar.
            </p>
          </aside>
          <div lang="pt-BR" className={PROSA} dangerouslySetInnerHTML={{ __html: ed.integralHtml }} />
        </div>
      </section>

      {/* 7. CTA verde final */}
      <section className="bg-gradient-hero py-16">
        <div className={`${CAIXA} text-center`}>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Seu projeto está pronto para o edital?</h3>
          <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto">
            Comece pelo Diagnóstico de Prontidão: 1 hora de consultoria (R$ 250) em que eu leio o seu caso e te digo, com
            honestidade, se e como posso ajudar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
              <a href={ed.linkDiagnostico} target="_blank" rel="noopener" data-origem={`${o}-final`}
                onClick={checkout(`${o}-final`, "consultoria-avulsa", 250)}>
                Agendar meu Diagnóstico de Prontidão
              </a>
            </Button>
            <Button asChild size="lg" className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-primary px-8">
              <a href={wa} target="_blank" rel="noopener noreferrer" data-origem={`${o}-whatsapp-final`}>
                Falar no WhatsApp
              </a>
            </Button>
          </div>
          <p className="text-xs text-white/60 mt-8 max-w-2xl mx-auto">
            O texto do edital é da FAPESP (Fundação de Amparo à Pesquisa do Estado de São Paulo), reproduzido com a fonte. A
            Cultivee não tem vínculo com a FAPESP e não influencia a avaliação das propostas.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default EditalPage;
