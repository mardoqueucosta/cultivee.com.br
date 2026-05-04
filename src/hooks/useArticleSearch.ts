import { useState, useMemo, useCallback } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";
import { removeDiacritics } from "@/lib/normalize";
import type { ArticleMeta } from "@/data/blogArticles";

const fuseOptions: IFuseOptions<ArticleMeta> = {
  keys: [
    { name: "titulo", weight: 0.5 },
    { name: "resumo", weight: 0.3 },
    { name: "categoria", weight: 0.2 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
  getFn: (obj, path) => {
    const value = Fuse.config.getFn(obj, path as string);
    if (typeof value === "string") return removeDiacritics(value);
    if (Array.isArray(value)) {
      return value.map((v) => (typeof v === "string" ? removeDiacritics(v) : v));
    }
    return value;
  },
};

export function useArticleSearch(articles: ArticleMeta[]) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const fuse = useMemo(() => new Fuse(articles, fuseOptions), [articles]);

  const results = useMemo(() => {
    let filtered = articles;
    if (categoryFilter !== "all") {
      filtered = filtered.filter((a) => a.categoria === categoryFilter);
    }
    const q = query.trim();
    if (!q) return filtered;
    const fuseInstance =
      categoryFilter === "all"
        ? fuse
        : new Fuse(filtered, fuseOptions);
    return fuseInstance.search(removeDiacritics(q)).map((r) => r.item);
  }, [articles, fuse, query, categoryFilter]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setCategoryFilter("all");
  }, []);

  return {
    query,
    setQuery,
    categoryFilter,
    setCategoryFilter,
    results,
    clearSearch,
    isSearching: query.trim().length > 0 || categoryFilter !== "all",
  };
}
