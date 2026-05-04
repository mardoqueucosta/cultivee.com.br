import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { CategoriaBadge } from "./Badge";
import type { ArticleMeta } from "@/data/blogArticles";

export function RelatedArticles({
  currentSlug,
  categoria,
  allArticles,
}: {
  currentSlug: string;
  categoria: string;
  allArticles: ArticleMeta[];
}) {
  const related = allArticles
    .filter((a) => a.categoria === categoria && a.slug !== currentSlug)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 pt-10 border-t border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">Artigos relacionados</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {related.map((a) => (
          <Link
            key={a.slug}
            to={`/blog/${a.slug}`}
            className="group flex flex-col gap-2 p-5 rounded-xl border border-border hover:border-primary/40 hover:bg-muted/30 transition-colors"
          >
            <CategoriaBadge variant={a.categoriaVariant}>{a.categoria}</CategoriaBadge>
            <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {a.titulo}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{a.resumo}</p>
            <div className="flex items-center justify-between mt-auto pt-2">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {a.leitura}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
