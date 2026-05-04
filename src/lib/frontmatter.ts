import yaml from "js-yaml";

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

export function parseFrontmatter<T = Record<string, unknown>>(raw: string): {
  data: T;
  content: string;
} {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) return { data: {} as T, content: raw };
  const data = (yaml.load(match[1]) ?? {}) as T;
  return { data, content: match[2].trim() };
}
