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
        <title>Cultivee — Cultivo Indoor, Hidroponia e Tecnologia</title>
        <meta
          name="description"
          content="Cursos práticos, produtos IoT e blog sobre cultivo indoor, hidroponia, microverdes e tecnologia agrícola. Aprenda com quem faz."
        />
        <link rel="canonical" href={`${SITE_BASE}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_BASE}/`} />
        <meta property="og:title" content="Cultivee — Cultivo Indoor, Hidroponia e Tecnologia" />
        <meta
          property="og:description"
          content="Cursos práticos, produtos IoT e blog sobre cultivo indoor, hidroponia, microverdes e tecnologia agrícola."
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