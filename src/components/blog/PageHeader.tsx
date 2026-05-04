import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbCrumb {
  label: string;
  href?: string;
}

export function PageHeader({
  overline,
  title,
  description,
  breadcrumbs,
  centered,
  accent = "primary",
}: {
  overline?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbCrumb[];
  centered?: boolean;
  accent?: "primary" | "agro" | "educa" | "tech";
}) {
  const overlineColor =
    accent === "agro"
      ? "text-agro"
      : accent === "educa"
      ? "text-educa"
      : accent === "tech"
      ? "text-tech"
      : "text-primary";

  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className={centered ? "max-w-3xl mx-auto" : ""}>
          {breadcrumbs && (
            <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li className="flex-shrink-0">
                  <Link to="/" className="hover:text-foreground transition-colors">
                    Início
                  </Link>
                </li>
                {breadcrumbs.map((crumb, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return (
                    <li
                      key={i}
                      className={cn(
                        "flex items-center gap-1.5 flex-shrink-0",
                        isLast && !crumb.href && "hidden sm:flex"
                      )}
                    >
                      <ChevronRight className="w-3 h-3 flex-shrink-0" aria-hidden />
                      {crumb.href ? (
                        <Link to={crumb.href} className="hover:text-foreground transition-colors">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span
                          className="text-foreground/80 truncate max-w-[200px] lg:max-w-none"
                          aria-current="page"
                        >
                          {crumb.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          {overline && (
            <span className={cn("text-xs font-bold uppercase tracking-wider mb-2 block", overlineColor)}>
              {overline}
            </span>
          )}
          <h1
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance break-words leading-tight",
              !centered && "max-w-3xl"
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "mt-3 text-lg text-muted-foreground leading-relaxed",
                !centered && "max-w-2xl"
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
