import { Head } from "vite-react-ssg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PageHeader } from "@/components/blog/PageHeader";
import { ArticleSearch } from "@/components/blog/ArticleSearch";
import { articlesMeta } from "@/data/blogArticles";
import { breadcrumbJsonLd } from "@/lib/breadcrumb-schema";

const BlogPage = () => {
  const jsonLd = breadcrumbJsonLd([{ name: "Blog", href: "/blog" }]);

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Blog | Cultivee</title>
        <meta
          name="description"
          content="Guias práticos sobre o agro, com fonte: horta, hidroponia, pragas, mercado e tecnologia no campo."
        />
        <link rel="canonical" href="https://cultivee.com.br/blog" />
        <meta property="og:title" content="Blog | Cultivee" />
        <meta
          property="og:description"
          content="Guias práticos sobre o agro, com fonte: horta, hidroponia, pragas, mercado e tecnologia no campo."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cultivee.com.br/blog" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <Navbar />

      <section className="bg-gradient-hero">
        <PageHeader
          overline="Blog Cultivee"
          title="Conteúdo que cultiva conhecimento"
          description="Guias práticos sobre o agro, com fonte: horta, hidroponia, pragas, mercado e tecnologia no campo."
          breadcrumbs={[{ label: "Blog" }]}
          hero
        />
      </section>

      <ArticleSearch articles={articlesMeta} />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPage;
