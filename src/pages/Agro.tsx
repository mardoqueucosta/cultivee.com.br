import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, LineChart, PlayCircle, BookOpen, Sprout } from "lucide-react";
import { SITE_BASE, breadcrumbJsonLd } from "@/lib/breadcrumb-schema";
import { collectionPageJsonLd } from "@/lib/seo-schemas";

// Cultivee Agro (reestruturacao 2026-10-07): a frente de CONTEUDO sobre agro em
// geral (decisao de 14/08: nao e so hidroponia). Os cursos sairam daqui para o
// Educa. Guias em destaque escolhidos pelos mais clicados no Search Console
// (90 dias ate 05/10/2026) misturados com temas de agro geral. Lista curada a mao
// para nao importar blogArticles (1 MB) neste chunk; conferir se o slug existe
// em src/data/blog ao trocar.
const guias = [
  {
    slug: "calendario-de-plantio-o-que-plantar-em-cada-mes-do-ano",
    titulo: "Calendário de plantio: o que plantar em cada mês do ano",
    tema: "Horta",
  },
  {
    slug: "solucao-nutritiva-para-hidroponia-guia-completo-calculadora",
    titulo: "Solução nutritiva para hidroponia: guia completo e calculadora",
    tema: "Hidroponia",
  },
  {
    slug: "manejo-integrado-de-pragas-mip-em-hortalicas-a-ceu-aberto",
    titulo: "Manejo integrado de pragas a céu aberto",
    tema: "Pragas e doenças",
  },
  {
    slug: "o-que-move-o-preco-do-cafe-no-brasil-como-a-cotacao-se-forma",
    titulo: "O que move o preço do café no Brasil",
    tema: "Mercado",
  },
  {
    slug: "microgreens-guia-completo-de-cultivo-comercial-e-viabilidade",
    titulo: "Microverdes: guia de cultivo comercial e viabilidade",
    tema: "Microverdes",
  },
  {
    slug: "capina-a-laser-a-tecnologia-que-elimina-herbicida-do-controle-de-plantas",
    titulo: "Capina a laser: o fim do herbicida no campo?",
    tema: "Tecnologia",
  },
];

const AgroPage = () => {
  const collectionLd = collectionPageJsonLd({
    pageName: "Cultivee Agro: conteúdo gratuito sobre o agro",
    pageUrl: `${SITE_BASE}/agro`,
    description:
      "Guias técnicos com fonte, cotações diárias do CEPEA e vídeos sobre agro: horta, hidroponia, pragas, mercado e tecnologia no campo.",
    items: guias.map((g) => ({ name: g.titulo, url: `/blog/${g.slug}` })),
  });
  const breadcrumbLd = breadcrumbJsonLd([{ name: "Agro", href: "/agro" }]);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Cultivee Agro: guias, cotações e vídeos sobre o agro</title>
        <meta
          name="description"
          content="Conteúdo gratuito sobre o agro: guias técnicos com fonte, cotações diárias do CEPEA e vídeos sobre horta, hidroponia, pragas, mercado e tecnologia."
        />
        <link rel="canonical" href={`${SITE_BASE}/agro`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_BASE}/agro`} />
        <meta property="og:title" content="Cultivee Agro: conteúdo gratuito sobre o agro" />
        <meta
          property="og:description"
          content="Guias técnicos com fonte, cotações diárias do CEPEA e vídeos do campo."
        />
        <script type="application/ld+json">{JSON.stringify(collectionLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Head>
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-agro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cultivee Agro</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Conteúdo gratuito sobre o agro, com fonte: da horta em casa às cotações do mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-agro hover:bg-white/90 font-semibold">
              <Link to="/blog">Ler o blog</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-agro"
            >
              <Link to="/cotacoes">Ver cotações de hoje</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Guias em destaque */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-agro/10 rounded-xl flex-shrink-0">
              <BookOpen className="w-7 h-7 text-agro" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Comece por aqui</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Os guias mais lidos do blog. Cada um cita de onde vem o dado: Embrapa, IAC, CEPEA e
                universidades.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guias.map((g) => (
              <Link
                key={g.slug}
                to={`/blog/${g.slug}`}
                className="group bg-card rounded-2xl border border-border p-6 hover:shadow-agro transition-shadow duration-300 flex flex-col"
              >
                <span className="self-start px-3 py-1 bg-agro/10 text-agro text-xs font-semibold rounded-full mb-3">
                  {g.tema}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-4 flex-1 group-hover:text-agro transition-colors">
                  {g.titulo}
                </h3>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-agro">
                  Ler o guia
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/blog">Ver todos os artigos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cotacoes e videos */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-agro/10 rounded-xl mb-4">
              <LineChart className="w-7 h-7 text-agro" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Cotações agrícolas</h2>
            <p className="text-muted-foreground mb-6">
              Painel diário com os indicadores CEPEA/ESALQ de boi gordo, café, soja, milho, trigo e
              leite, com a data de apuração de cada um. Sem previsão de preço.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/cotacoes" className="inline-flex items-center gap-2 font-semibold text-agro">
                Todas as cotações <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/cotacoes/cafe" className="inline-flex items-center gap-2 font-semibold text-agro">
                Cotação do café <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-agro/10 rounded-xl mb-4">
              <PlayCircle className="w-7 h-7 text-agro" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Vídeos</h2>
            <p className="text-muted-foreground mb-6">
              Máquinas e novidades das feiras do agro, cultivo na prática e a pesquisa por trás de cada
              técnica, no YouTube e no Instagram da Cultivee.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.youtube.com/@cultivee_br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-agro"
              >
                YouTube <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/cultivee.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-agro"
              >
                Instagram <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ponte para o Educa */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Quer aprender a produzir?</h2>
          <p className="text-lg text-white/85 mb-8 max-w-xl mx-auto">
            A trilha Cultivo do Cultivee Educa reúne os cursos de microverdes, hidroponia e cultivo indoor.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
            <Link to="/educa#cultivo">Conhecer a trilha Cultivo</Link>
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AgroPage;
