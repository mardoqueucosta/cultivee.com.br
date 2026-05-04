import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "agro" | "educa" | "tech" | "slate";

const variantStyles: Record<Variant, string> = {
  agro: "bg-agro/10 text-agro-dark border-agro/20",
  educa: "bg-educa/10 text-educa-dark border-educa/20",
  tech: "bg-tech/10 text-tech-dark border-tech/20",
  slate: "bg-muted text-muted-foreground border-border",
};

export function CategoriaBadge({
  children,
  variant = "agro",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md border text-xs font-semibold tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
