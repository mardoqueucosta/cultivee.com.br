import { Head } from "vite-react-ssg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Download, FileText } from "lucide-react";
import { SITE_BASE, breadcrumbJsonLd } from "@/lib/breadcrumb-schema";
import { collectionPageJsonLd } from "@/lib/seo-schemas";
import { manuais, type Manual } from "@/data/manuais";

function Grade({ lista }: { lista: Manual[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {lista.map((m) => {
        const pronto = m.status === "disponivel" && m.pdf;
        return (
          <article
            key={m.slug}
            id={m.slug}
            className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)] bg-card border border-border rounded-2xl overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            <div className="relative">
              <img
                src={m.imagem}
                alt={m.alt}
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] object-cover"
              />
              {!pronto && (
                <span className="absolute top-3 left-3 rounded-full bg-sun px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-deep">
                  Em breve
                </span>
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs font-bold tracking-[0.14em] uppercase text-primary mb-2">{m.tipo}</span>
              <h3 className="text-xl font-bold text-foreground mb-2">{m.titulo}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-1">{m.resumo}</p>
              <ul className="space-y-2 mb-6">
                {m.destaques.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-primary" />
                    {d}
                  </li>
                ))}
              </ul>
              {pronto ? (
                <>
                  <a href={m.pdf} download className="block" data-manual={m.slug}>
                    <Button className="w-full gap-2" size="lg">
                      <Download className="w-4 h-4" />
                      Baixar o manual
                    </Button>
                  </a>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <FileText className="w-3.5 h-3.5" />
                    PDF, {m.paginas} páginas, {m.tamanho}
                  </p>
                </>
              ) : (
                <Button className="w-full gap-2" size="lg" variant="outline" disabled>
                  <Clock className="w-4 h-4" />
                  Em breve
                </Button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

// Lista de manuais de montagem e plantio (27/11/2026). Os cards saem de src/data/manuais.ts: manual novo é só um item a mais lá.
const ManuaisPage = () => {
  const disponiveis = manuais.filter((m) => m.status === "disponivel" && m.pdf);
  const proximos = manuais.filter((m) => !(m.status === "disponivel" && m.pdf));
  const collectionLd = collectionPageJsonLd({
    pageName: "Manuais de montagem e plantio da Cultivee",
    pageUrl: `${SITE_BASE}/manuais`,
    description:
      "Manuais gratuitos em PDF para montar e plantar em casa: lista de compras, medidas e passo a passo com fotos.",
    items: disponiveis.map((m) => ({
      name: m.titulo,
      url: `${SITE_BASE}${m.pdf}`,
      description: m.resumo,
    })),
  });
  const breadcrumbLd = breadcrumbJsonLd([{ name: "Manuais", href: "/manuais" }]);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Manuais de montagem e plantio grátis em PDF | Cultivee</title>
        <meta
          name="description"
          content="Baixe grátis os manuais de montagem e plantio da Cultivee: horta vertical de parede em canos de PVC e outros projetos, com lista de compras, medidas e passo a passo com fotos."
        />
        <link rel="canonical" href={`${SITE_BASE}/manuais`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_BASE}/manuais`} />
        <meta property="og:title" content="Manuais de montagem e plantio da Cultivee" />
        <meta
          property="og:description"
          content="Manuais grátis em PDF: lista de compras, medidas e passo a passo com fotos."
        />
        {disponiveis[0] && <meta property="og:image" content={`${SITE_BASE}${disponiveis[0].imagem}`} />}
        <script type="application/ld+json">{JSON.stringify(collectionLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Head>
      <Navbar />

      <section className="pt-28 pb-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/30 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Grátis, em PDF
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Manuais de montagem e plantio</h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto">
            Os projetos dos nossos vídeos, explicados para você fazer em casa: lista de compras, medidas e o passo a
            passo com fotos.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Grade lista={disponiveis} />
        </div>
      </section>

      {proximos.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Próximos manuais</h2>
              <p className="text-muted-foreground">
                Projetos que estão a caminho, em vídeo e em manual. Cada um ganha o botão de download quando ficar pronto.
              </p>
            </div>
            <Grade lista={proximos} />
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ManuaisPage;
