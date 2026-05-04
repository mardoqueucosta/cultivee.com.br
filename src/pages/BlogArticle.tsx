import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Head } from "vite-react-ssg";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, Clock, RefreshCw, User, ArrowLeft, Lightbulb, List } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { CategoriaBadge } from "@/components/blog/Badge";
import { PageHeader } from "@/components/blog/PageHeader";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import {
  articlesMeta,
  getArticleBySlug,
  type CategoriaVariant,
} from "@/data/blogArticles";
import {
  extractHeadingsFromMarkdown,
  extractFaqFromMarkdown,
  injectCrossReferences,
  buildPictureProps,
} from "@/lib/article-utils";
import { slugify } from "@/lib/normalize";
import { knownEntities } from "@/data/entities";
import { breadcrumbJsonLd, SITE_BASE } from "@/lib/breadcrumb-schema";
import imageVariantsRaw from "@/data/image-variants.json";
import blurDataRaw from "@/data/blur-data.json";
import type { ImageVariants } from "@/lib/article-utils";

const imageVariants = imageVariantsRaw as Record<string, ImageVariants>;
const blurMap = blurDataRaw as Record<string, string>;

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const variantAccent: Record<CategoriaVariant, { bg: string; text: string; border: string; gradient: string }> = {
  agro: {
    bg: "bg-agro/5",
    text: "text-agro",
    border: "border-agro/30",
    gradient: "from-agro/20 via-agro/5 to-background",
  },
  educa: {
    bg: "bg-educa/5",
    text: "text-educa",
    border: "border-educa/30",
    gradient: "from-educa/20 via-educa/5 to-background",
  },
  tech: {
    bg: "bg-tech/5",
    text: "text-tech",
    border: "border-tech/30",
    gradient: "from-tech/20 via-tech/5 to-background",
  },
};

function HeroPicture({ src, alt }: { src: string; alt: string }) {
  const { sets, sizes, blur } = buildPictureProps(src, imageVariants, blurMap);
  const blurStyle = blur
    ? {
        backgroundImage: `url(${blur})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  if (!sets) {
    return (
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover"
        style={blurStyle}
      />
    );
  }

  return (
    <picture>
      {sets.avif && <source type="image/avif" srcSet={sets.avif} sizes={sizes} />}
      {sets.webp && <source type="image/webp" srcSet={sets.webp} sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover"
        style={blurStyle}
      />
    </picture>
  );
}

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const accent = variantAccent[article.categoriaVariant];
  const articleUrl = `${SITE_BASE}/blog/${article.slug}`;
  const heroImage = article.imagens?.[0];

  const enrichedContent = useMemo(
    () =>
      injectCrossReferences(
        article.conteudo,
        { slug: article.slug, categoria: article.categoria },
        articlesMeta
      ),
    [article.conteudo, article.slug, article.categoria]
  );

  const headings = useMemo(
    () => extractHeadingsFromMarkdown(article.conteudo),
    [article.conteudo]
  );

  const faqItems = useMemo(
    () => extractFaqFromMarkdown(article.conteudo),
    [article.conteudo]
  );

  const mentionedEntities = useMemo(() => {
    const lower = article.conteudo.toLowerCase();
    return Object.entries(knownEntities)
      .filter(([key]) => lower.includes(key))
      .map(([, e]) => ({
        "@type": e.type,
        name: e.name,
        url: e.url,
        ...(e.sameAs ? { sameAs: e.sameAs } : {}),
      }));
  }, [article.conteudo]);

  const ogImage = `${SITE_BASE}/og/${article.slug}.png`;
  const fallbackImage = heroImage ? `${SITE_BASE}${heroImage.src}` : `${SITE_BASE}/icon-512.png`;

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.titulo,
    description: article.resumo,
    datePublished: article.data,
    dateModified: article.dataModificacao || article.data,
    image: heroImage ? [ogImage, fallbackImage] : ogImage,
    author: {
      "@type": "Organization",
      name: "Equipe Cultivee",
      url: SITE_BASE,
    },
    publisher: {
      "@type": "Organization",
      name: "Cultivee",
      url: SITE_BASE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_BASE}/icon-512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: article.categoria,
    inLanguage: "pt-BR",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".tldr", "h2", ".prose p:first-of-type"],
    },
    ...(mentionedEntities.length > 0 ? { mentions: mentionedEntities } : {}),
  };

  const jsonLdBreadcrumb = breadcrumbJsonLd([
    { name: "Blog", href: "/blog" },
    { name: article.titulo, href: `/blog/${article.slug}` },
  ]);

  const jsonLdFaq =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((it) => ({
            "@type": "Question",
            name: it.question,
            acceptedAnswer: { "@type": "Answer", text: it.answer },
          })),
        }
      : null;

  const cursoSlug =
    article.categoriaVariant === "agro"
      ? "/agro"
      : article.categoriaVariant === "educa"
      ? "/educa"
      : "/tech";

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{article.titulo} | Blog Cultivee</title>
        <meta name="description" content={article.resumo} />
        <link rel="canonical" href={articleUrl} />
        <meta property="og:title" content={article.titulo} />
        <meta property="og:description" content={article.resumo} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:published_time" content={article.data} />
        <meta
          property="article:modified_time"
          content={article.dataModificacao || article.data}
        />
        <meta property="article:section" content={article.categoria} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.titulo} />
        <meta name="twitter:description" content={article.resumo} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLdArticle)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdBreadcrumb)}</script>
        {jsonLdFaq && (
          <script type="application/ld+json">{JSON.stringify(jsonLdFaq)}</script>
        )}
      </Head>

      <Navbar />

      <PageHeader
        overline={article.categoria}
        title={article.titulo}
        description={article.resumo}
        centered
        accent={article.categoriaVariant}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: article.titulo },
        ]}
      />

      {heroImage && (
        <div className={`bg-gradient-to-br ${accent.gradient}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <figure className="rounded-2xl overflow-hidden shadow-elegant aspect-[16/9] bg-muted">
              <HeroPicture src={heroImage.src} alt={heroImage.alt} />
            </figure>
            {heroImage.caption && (
              <figcaption className="text-xs text-muted-foreground italic text-center mt-3">
                {heroImage.caption}
              </figcaption>
            )}
          </div>
        </div>
      )}

      <article className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-border">
            <CategoriaBadge variant={article.categoriaVariant}>
              {article.categoria}
            </CategoriaBadge>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={article.data}>{formatDate(article.data)}</time>
            </span>
            {article.dataModificacao && article.dataModificacao !== article.data && (
              <span className={`flex items-center gap-1.5 text-xs font-medium ${accent.text}`}>
                <RefreshCw className="w-3.5 h-3.5" />
                <time dateTime={article.dataModificacao}>
                  Atualizado em {formatDate(article.dataModificacao)}
                </time>
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {article.leitura} de leitura
            </span>
          </div>

          {article.tldr && (
            <aside className={`tldr mb-10 rounded-xl border-2 p-6 ${accent.border} ${accent.bg}`}>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className={`w-5 h-5 ${accent.text}`} />
                <span className="font-bold text-foreground text-sm uppercase tracking-wider">
                  TL;DR
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{article.tldr}</p>
            </aside>
          )}

          {headings.length >= 3 && (
            <nav
              aria-label="Índice"
              className="mb-10 rounded-xl border border-border bg-muted/30 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <List className="w-5 h-5 text-muted-foreground" />
                <span className="font-bold text-foreground text-sm uppercase tracking-wider">
                  Neste artigo
                </span>
              </div>
              <ol className="space-y-2">
                {headings.map((h, idx) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <span className="text-xs font-mono text-muted-foreground/60 mt-0.5 min-w-[1.5rem]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="group-hover:underline underline-offset-2">{h.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-table:border prose-th:bg-muted prose-th:p-3 prose-td:p-3 prose-td:border prose-th:border">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node: _node, children, ...props }) => {
                  const text = String(children);
                  return (
                    <h2 id={slugify(text)} {...props}>
                      {children}
                    </h2>
                  );
                },
                blockquote: ({ node: _node, children, ...props }) => {
                  const raw = JSON.stringify(children);
                  if (raw.includes("Leia também")) {
                    return (
                      <aside
                        className={`not-prose my-6 p-4 rounded-xl border ${accent.border} ${accent.bg}`}
                      >
                        <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${accent.text}`}>
                          Leia também
                        </div>
                        <blockquote {...props} className="border-0 m-0 p-0 not-italic text-foreground">
                          {children}
                        </blockquote>
                      </aside>
                    );
                  }
                  return <blockquote {...props}>{children}</blockquote>;
                },
              }}
            >
              {enrichedContent}
            </ReactMarkdown>
          </div>

          <div className={`mt-10 p-6 rounded-xl border ${accent.border} ${accent.bg}`}>
            <h3 className={`text-lg font-bold mb-2 ${accent.text}`}>Quer aprofundar?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Conheça os cursos Cultivee da área {article.categoria} e transforme teoria em prática.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <Link to={cursoSlug}>Ver cursos {article.categoria}</Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://wa.me/5519992805563"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <section className="mt-10 pt-8 border-t border-border">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Equipe Cultivee</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Especialistas em agricultura, educação e tecnologia, comprometidos em
                  compartilhar conhecimento prático para sua autonomia.
                </p>
              </div>
            </div>
          </section>

          <RelatedArticles
            currentSlug={article.slug}
            categoria={article.categoria}
            allArticles={articlesMeta}
          />

          <div className="mt-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Ver todos os artigos
            </Link>
          </div>
        </div>
      </article>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogArticlePage;
