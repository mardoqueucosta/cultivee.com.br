import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "src/data/blog");

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

export interface ArticleMetaNode {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  categoriaVariant: string;
  data: string;
  dataModificacao?: string;
  leitura: string;
  tldr?: string;
  imagens?: { src: string; alt: string; caption: string }[];
}

export function loadAllArticles(): ArticleMetaNode[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const m = raw.match(FRONTMATTER_RE);
      const data = m ? (yaml.load(m[1]) as Partial<ArticleMetaNode>) : {};
      return {
        slug: file.replace(/\.md$/, ""),
        titulo: data.titulo ?? "",
        resumo: data.resumo ?? "",
        categoria: data.categoria ?? "Agro",
        categoriaVariant: data.categoriaVariant ?? "agro",
        data: data.data ?? "",
        dataModificacao: data.dataModificacao,
        leitura: data.leitura ?? "",
        tldr: data.tldr,
        imagens: data.imagens,
      } as ArticleMetaNode;
    })
    .sort((a, b) => b.data.localeCompare(a.data));
}

export const PROJECT_ROOT = ROOT;
