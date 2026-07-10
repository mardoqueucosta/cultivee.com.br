import { parseFrontmatter } from "@/lib/frontmatter";
import { rankRelated } from "@/lib/article-utils";

export type CategoriaVariant = "agro" | "educa" | "tech";
export type Categoria = "Agro" | "Educa" | "Tech";

export interface ArticleImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ArticleMeta {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: Categoria;
  categoriaVariant: CategoriaVariant;
  data: string;
  dataModificacao?: string;
  leitura: string;
  tldr?: string;
  imagens?: ArticleImage[];
}

export interface BlogArticle extends ArticleMeta {
  conteudo: string;
}

const rawModules = import.meta.glob("./blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function buildArticles(): BlogArticle[] {
  const list: BlogArticle[] = [];
  for (const [path, raw] of Object.entries(rawModules)) {
    const slug = path.replace(/^.*\/(.+)\.md$/, "$1");
    const { data, content } = parseFrontmatter<Partial<ArticleMeta>>(raw);
    list.push({
      slug,
      titulo: data.titulo ?? "",
      resumo: data.resumo ?? "",
      categoria: (data.categoria ?? "Agro") as Categoria,
      categoriaVariant: (data.categoriaVariant ?? "agro") as CategoriaVariant,
      data: data.data ?? "",
      dataModificacao: data.dataModificacao,
      leitura: data.leitura ?? "",
      tldr: data.tldr,
      imagens: data.imagens,
      conteudo: content,
    });
  }
  return list.sort((a, b) => b.data.localeCompare(a.data));
}

export const blogArticles: BlogArticle[] = buildArticles();

export const articlesMeta: ArticleMeta[] = blogArticles.map(
  ({ conteudo: _conteudo, ...meta }) => meta
);

export const articlesMetaMap: Record<string, ArticleMeta> = Object.fromEntries(
  articlesMeta.map((a) => [a.slug, a])
);

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getRelatedArticles(
  currentSlug: string,
  categoria: Categoria,
  limit = 3
): ArticleMeta[] {
  // relevância por tokens de título+slug (rankRelated); antes era "os N mais
  // recentes da categoria", o que mandava todo o site pros mesmos 3 artigos
  const current = articlesMetaMap[currentSlug];
  if (!current) return articlesMeta.filter((a) => a.slug !== currentSlug).slice(0, limit);
  return rankRelated(current, articlesMeta, limit);
}
