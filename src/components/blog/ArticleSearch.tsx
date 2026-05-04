import { Link } from "react-router-dom";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import { CategoriaBadge } from "./Badge";
import { useArticleSearch } from "@/hooks/useArticleSearch";
import type { ArticleMeta } from "@/data/blogArticles";
import { cn } from "@/lib/utils";

const categoryFilters = [
  { value: "all", label: "Todos", dot: null },
  { value: "Agro", label: "Agro", dot: "bg-agro" },
  { value: "Educa", label: "Educa", dot: "bg-educa" },
  { value: "Tech", label: "Tech", dot: "bg-tech" },
];

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ArticleSearch({ articles }: { articles: ArticleMeta[] }) {
  const {
    query,
    setQuery,
    categoryFilter,
    setCategoryFilter,
    results,
    clearSearch,
    isSearching,
  } = useArticleSearch(articles);

  const display = isSearching ? results : articles;
  const featured = !isSearching && articles.length > 0 ? articles[0] : null;
  const rest = featured ? articles.slice(1) : articles;

  const byCategoria: Record<string, ArticleMeta[]> = {};
  for (const a of rest) {
    if (!byCategoria[a.categoria]) byCategoria[a.categoria] = [];
    byCategoria[a.categoria].push(a);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artigos por título, resumo ou categoria..."
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors shadow-sm"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Limpar busca"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categoryFilters.map((f) => {
          const active = categoryFilter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setCategoryFilter(f.value)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors",
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
              )}
            >
              {f.dot && <span className={`w-2 h-2 rounded-full ${f.dot}`} />}
              {f.label}
            </button>
          );
        })}
      </div>

      {isSearching && (
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
            {display.length} {display.length === 1 ? "artigo encontrado" : "artigos encontrados"}
          </span>
          <button
            onClick={clearSearch}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Limpar busca
          </button>
        </div>
      )}

      {isSearching && display.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground text-sm mb-1">
            Nenhum artigo encontrado
            {query && <> para &ldquo;{query}&rdquo;</>}
          </p>
          <p className="text-muted-foreground/60 text-xs">Tente outro termo ou categoria.</p>
        </div>
      )}

      {isSearching && display.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {display.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}

      {!isSearching && featured && (
        <Link
          to={`/blog/${featured.slug}`}
          className="group block relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-8 lg:p-12 mb-10 text-primary-foreground"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <CategoriaBadge variant={featured.categoriaVariant} className="bg-background/20 text-primary-foreground border-background/30">
                {featured.categoria}
              </CategoriaBadge>
              <span className="text-xs font-mono flex items-center gap-1 opacity-80">
                <Clock className="w-3 h-3" />
                {featured.leitura}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 max-w-3xl text-balance leading-tight group-hover:opacity-90 transition-opacity">
              {featured.titulo}
            </h2>
            <p className="text-base max-w-2xl mb-6 leading-relaxed opacity-90">{featured.resumo}</p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
              Ler artigo completo
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      )}

      {!isSearching &&
        Object.entries(byCategoria).map(([cat, items]) => (
          <div key={cat} className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-xl font-bold text-foreground">{cat}</h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-mono">
                {items.length} {items.length === 1 ? "artigo" : "artigos"}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        ))}
    </section>
  );
}

function ArticleCard({ article: a }: { article: ArticleMeta }) {
  return (
    <Link
      to={`/blog/${a.slug}`}
      className="group flex flex-col p-6 rounded-xl border border-border bg-background hover:border-primary/40 hover:shadow-elegant transition-all"
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <CategoriaBadge variant={a.categoriaVariant}>{a.categoria}</CategoriaBadge>
        <span className="text-xs text-muted-foreground font-mono flex items-center gap-1 shrink-0">
          <Clock className="w-3 h-3" />
          {a.leitura}
        </span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug flex-1">
        {a.titulo}
      </h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{a.resumo}</p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">{formatDate(a.data)}</span>
        <span className="text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
          Ler
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
