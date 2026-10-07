import { Head } from "vite-react-ssg";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PillarsSection from "@/components/PillarsSection";
import WhySection from "@/components/WhySection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_BASE } from "@/lib/breadcrumb-schema";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo-schemas";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Cultivee: conteúdo, cursos e pesquisa aplicada no agro</title>
        <meta
          name="description"
          content="Instituto de ensino, pesquisa e inovação no agro, incubado na ESALQTec. Guias técnicos com fonte, cotações CEPEA, cursos de cultivo e de negócios."
        />
        <link rel="canonical" href={`${SITE_BASE}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_BASE}/`} />
        <meta property="og:title" content="Cultivee: conteúdo, cursos e pesquisa aplicada no agro" />
        <meta
          property="og:description"
          content="Guias técnicos com fonte, cotações CEPEA, cursos de cultivo e de negócios, e pesquisa aplicada com financiamento público."
        />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteJsonLd)}
        </script>
      </Head>
      <Navbar />
      <main>
        <HeroSection />
        <PillarsSection />
        <WhySection />
        <NewsletterSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;