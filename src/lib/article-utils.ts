import { slugify } from "./normalize";

export interface Heading {
  id: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function extractHeadingsFromMarkdown(markdown: string): Heading[] {
  const re = /^##\s+(.+)$/gm;
  const out: Heading[] = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(markdown)) !== null) {
    const text = match[1].trim();
    if (text) out.push({ id: slugify(text), text });
  }
  return out;
}

export function extractFaqFromMarkdown(markdown: string): FaqItem[] {
  const lower = markdown.toLowerCase();
  const idx =
    lower.indexOf("\n## perguntas frequentes") !== -1
      ? lower.indexOf("\n## perguntas frequentes") + 1
      : lower.indexOf("\n## faq") !== -1
      ? lower.indexOf("\n## faq") + 1
      : -1;
  if (idx === -1) return [];

  const section = markdown.slice(idx);
  const nextH2 = section.search(/\n## /);
  const body = nextH2 !== -1 ? section.slice(0, nextH2) : section;

  const items: FaqItem[] = [];
  const h3 = /^###\s+(.+?)\s*$\n+([\s\S]+?)(?=^###\s|\n## |\Z)/gm;
  let m: RegExpExecArray | null;
  while ((m = h3.exec(body)) !== null) {
    const q = m[1].replace(/[*_]+/g, "").trim();
    const a = m[2].replace(/\n+$/, "").replace(/[*_]+/g, "").trim();
    if (q && a) items.push({ question: q, answer: a });
  }
  return items;
}

// ── Relevância para links internos dinâmicos ────────────────────────────────
// Antes (até 2026-07-10) o "Leia também" e o grid de relacionados pegavam os N
// artigos MAIS RECENTES da mesma categoria: como ~tudo é 'Agro', o site inteiro
// apontava para os mesmos 2-3 artigos novos (zero relevância, e todas as páginas
// re-renderizavam a cada publicação diária). Agora: score por tokens
// compartilhados de título+slug; empate resolve por recência (pool já vem
// ordenado por data desc); score zero em tudo cai no comportamento antigo.
const LINK_STOP = new Set([
  "guia", "completo", "definitivo", "como", "plantar", "para", "casa", "passo",
  "vaso", "2026", "2025", "que", "com", "sem", "dos", "das", "seu", "sua",
  "por", "mes", "ano", "cada", "monte", "sistema", "uma", "nao", "nos", "nas",
  "ate", "sao", "tem", "ser", "vai", "mais", "sobre", "entre",
]);

function linkTokens(titulo: string, slug: string): Set<string> {
  const norm = (s: string) =>
    s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const words = `${norm(titulo)} ${slug.replace(/-/g, " ")}`
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    // >=3 para não perder siglas-keyword (NFT, IoT, LED); ruído de 3 letras vai pro STOP
    .filter((w) => w.length >= 3 && !LINK_STOP.has(w));
  return new Set(words);
}

export function rankRelated<
  T extends { slug: string; titulo: string; categoria: string }
>(current: { slug: string; titulo: string }, pool: T[], limit: number): T[] {
  const mine = linkTokens(current.titulo, current.slug);
  const scored = pool
    .filter((a) => a.slug !== current.slug)
    .map((a, i) => {
      let score = 0;
      for (const t of linkTokens(a.titulo, a.slug)) if (mine.has(t)) score++;
      return { a, score, i };
    });
  scored.sort((x, y) => y.score - x.score || x.i - y.i); // empate: ordem do pool (data desc)
  const relevant = scored.filter((s) => s.score > 0).slice(0, limit).map((s) => s.a);
  if (relevant.length >= limit) return relevant;
  // completa com os mais recentes ainda não escolhidos (comportamento antigo)
  const chosen = new Set(relevant.map((a) => a.slug));
  const filler = scored.filter((s) => !chosen.has(s.a.slug)).map((s) => s.a);
  return [...relevant, ...filler].slice(0, limit);
}

export function injectCrossReferences(
  markdown: string,
  current: { slug: string; titulo: string; categoria: string },
  pool: { slug: string; titulo: string; resumo: string; categoria: string }[]
): string {
  // não repetir alvo que o corpo já linka (o redator já fez esse cross-link)
  const alreadyLinked = new Set(
    [...markdown.matchAll(/\]\(\/blog\/([a-z0-9-]+)/g)].map((m) => m[1])
  );
  const related = rankRelated(
    current,
    pool.filter((a) => !alreadyLinked.has(a.slug)),
    2
  );

  if (related.length === 0) return markdown;

  const lines = markdown.split("\n");
  const h2Lines: number[] = [];
  lines.forEach((line, i) => {
    if (/^##\s+/.test(line)) h2Lines.push(i);
  });

  const targets = [2, 4].filter((n) => n < h2Lines.length);
  if (targets.length === 0) return markdown;

  const insertions: { line: number; block: string }[] = [];
  targets.forEach((targetIdx, refIdx) => {
    if (refIdx >= related.length) return;
    const a = related[refIdx];
    const desc =
      a.resumo.length <= 120
        ? a.resumo
        : a.resumo.slice(0, a.resumo.lastIndexOf(" ", 120)).concat("…");
    insertions.push({
      line: h2Lines[targetIdx],
      block: `\n> **Leia também:** [${a.titulo}](/blog/${a.slug})  \n> ${desc}\n`,
    });
  });

  for (let k = insertions.length - 1; k >= 0; k--) {
    lines.splice(insertions[k].line, 0, insertions[k].block);
  }
  return lines.join("\n");
}

export interface ImageVariants {
  base: string;
  widths: number[];
  formats: ("avif" | "webp")[];
  blur?: string;
}

export function buildPictureProps(
  src: string,
  variants: Record<string, ImageVariants>,
  blurMap: Record<string, string>
) {
  const variant = variants[src];
  const blur = blurMap[src];
  if (!variant) return { src, blur };

  const sizes = "(max-width: 768px) 100vw, 1024px";
  const sets: Record<string, string> = {};
  for (const fmt of variant.formats) {
    sets[fmt] = variant.widths
      .map((w) => `${variant.base}-${w}.${fmt} ${w}w`)
      .join(", ");
  }
  return { src, blur, sets, sizes };
}
