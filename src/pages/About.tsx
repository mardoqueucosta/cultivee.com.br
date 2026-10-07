import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageHero from "@/components/ImageHero";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Leaf, GraduationCap, Landmark, ExternalLink, ArrowRight, Building2 } from "lucide-react";
import { SITE_BASE, breadcrumbJsonLd } from "@/lib/breadcrumb-schema";
import { aboutPageJsonLd, authorJsonLd } from "@/lib/seo-schemas";

const LATTES_URL = "http://lattes.cnpq.br/7819717440359474";
const ORCID_URL = "https://orcid.org/0000-0002-4395-3069";

const ABOUT_DESCRIPTION =
  "Cultivee Instituto de Ensino, Pesquisa e Inovação Ltda: conteúdo gratuito sobre agro, cursos de cultivo e negócios e projetos de pesquisa aplicada. Incubada na ESALQTec, Piracicaba-SP.";

const AboutPage = () => {
  const breadcrumbLd = breadcrumbJsonLd([{ name: "Sobre", href: "/sobre" }]);
  const personLd = {
    ...authorJsonLd,
    name: "Mardoqueu Martins da Costa",
    alternateName: "Mardoqueu Costa",
    honorificPrefix: "Prof. Dr.",
  };
  const aboutLd = { ...aboutPageJsonLd, description: ABOUT_DESCRIPTION };

  const fronts = [
    {
      icon: Leaf,
      title: "Agro",
      color: "text-agro",
      bg: "bg-agro/10",
      text: "Conteúdo gratuito sobre o agro em geral: artigos no blog, cotações diárias com dados do CEPEA e vídeos.",
      href: "/agro",
      cta: "Ir para o Agro",
    },
    {
      icon: GraduationCap,
      title: "Educa",
      color: "text-educa",
      bg: "bg-educa/10",
      text: "Cursos e formação em duas trilhas: Cultivo, para quem produz, e Negócios, para quem empreende no agro.",
      href: "/educa",
      cta: "Ir para a Educa",
    },
    {
      icon: Landmark,
      title: "Projetos",
      color: "text-tech",
      bg: "bg-tech/10",
      text: "Pesquisa aplicada com financiamento público, como o projeto PIPE Fase 1 FAPESP em execução.",
      href: "/projetos",
      cta: "Ver os projetos",
    },
  ];

  return (
    <div className="min-h-screen">
      <Head>
        <title>Sobre a Cultivee | Ensino, pesquisa e inovação no agro</title>
        <meta name="description" content={ABOUT_DESCRIPTION} />
        <link rel="canonical" href={`${SITE_BASE}/sobre`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_BASE}/sobre`} />
        <meta property="og:title" content="Sobre a Cultivee" />
        <meta
          property="og:description"
          content="Conhecimento técnico e científico para o agro e para quem empreende. Incubada na ESALQTec, Piracicaba-SP."
        />
        <script type="application/ld+json">{JSON.stringify(personLd)}</script>
        <script type="application/ld+json">{JSON.stringify(aboutLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Head>
      <Navbar />

      <ImageHero
        image="/img/site/topo-sobre.jpg"
        alt="Canteiros experimentais e uma pequena estufa ao amanhecer"
        eyebrow="Sobre a Cultivee"
        title="Ensino, pesquisa e inovação no agro"
        subtitle="Para quem produz e para quem empreende, a partir da ESALQTec, em Piracicaba-SP."
      />

      {/* Quem somos */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Quem somos</h2>
          <div className="bg-card rounded-2xl p-8 border border-border shadow-elegant">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  A <strong className="text-foreground">Cultivee Instituto de Ensino, Pesquisa e Inovação Ltda</strong>{" "}
                  (CNPJ 64.471.739/0001-64) foi aberta em janeiro de 2026 e é incubada na{" "}
                  <strong className="text-foreground">ESALQTec</strong>, a incubadora da ESALQ/USP, em Piracicaba-SP.
                </p>
                <p>
                  O nome carrega um duplo sentido: cultivar conhecimento e cultivar o que vem do campo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que fazemos */}
      <section className="py-16 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">O que fazemos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {fronts.map((f) => (
              <div key={f.title} className="bg-card rounded-2xl p-8 border border-border shadow-elegant flex flex-col">
                <div className={`inline-flex items-center justify-center w-14 h-14 ${f.bg} rounded-xl mb-5`}>
                  <f.icon className={`w-7 h-7 ${f.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{f.text}</p>
                <Link
                  to={f.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  {f.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fundador */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Fundador</h2>
          <div className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-elegant">
            <h3 className="text-2xl font-bold text-foreground mb-1">Prof. Dr. Mardoqueu Martins da Costa</h3>
            <p className="text-sm text-primary font-medium mb-6">Formação completa pela USP</p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>Graduação em Física (IFSC/USP)</li>
              <li>Mestrado e doutorado em Engenharia Elétrica (EESC/USP)</li>
              <li>Pós-doutorado em Engenharia de Biossistemas (ESALQ/USP)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Autor de 22 artigos, 3 patentes e 9 softwares. Recebeu o Prêmio Santander de Empreendedorismo e o
              II Prêmio Ibero-Americano de Inovação. Soma 18 financiamentos aprovados, de 7 fontes, entre
              coordenação e participação.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={LATTES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                Currículo Lattes
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={ORCID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                ORCID
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Missão */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Nossa missão</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Levar conhecimento técnico e científico ao agro e a quem empreende, de forma clara e aplicável.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AboutPage;
