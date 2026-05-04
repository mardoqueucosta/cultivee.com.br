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

export function injectCrossReferences(
  markdown: string,
  current: { slug: string; categoria: string },
  pool: { slug: string; titulo: string; resumo: string; categoria: string }[]
): string {
  const related = pool
    .filter((a) => a.categoria === current.categoria && a.slug !== current.slug)
    .slice(0, 2);

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
