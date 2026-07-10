import fs from "node:fs";
import path from "node:path";
import { loadAllArticles, PROJECT_ROOT } from "./_load-articles";

const SITE = "https://cultivee.com.br";

// lastmod REAL das rotas estaticas — bump manual quando uma pagina estatica mudar
// de verdade. NUNCA usar a data do build: com deploy diario do pipeline, as 16
// rotas "mudariam" todo dia e o Google passa a ignorar o lastmod do site inteiro.
// 2026-07-02 = ultima mudanca site-wide real (troca do numero de WhatsApp).
const STATIC_LASTMOD = "2026-07-02";

const STATIC_PATHS = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/agro", changefreq: "weekly", priority: "0.9" },
  { path: "/educa", changefreq: "weekly", priority: "0.9" },
  { path: "/tech", changefreq: "weekly", priority: "0.9" },
  { path: "/sobre", changefreq: "monthly", priority: "0.6" },
  { path: "/contato", changefreq: "monthly", priority: "0.6" },
  { path: "/projeto", changefreq: "monthly", priority: "0.5" },
  { path: "/aplicativos", changefreq: "monthly", priority: "0.5" },
  { path: "/produtos", changefreq: "monthly", priority: "0.7" },
  { path: "/produtos/controle-hidroponia", changefreq: "monthly", priority: "0.7" },
  { path: "/produtos/hidro-farm", changefreq: "monthly", priority: "0.7" },
  { path: "/produtos/controle-camera", changefreq: "monthly", priority: "0.7" },
  { path: "/cursos/microverdes", changefreq: "monthly", priority: "0.7" },
  { path: "/cursos/hidroponia", changefreq: "monthly", priority: "0.7" },
  { path: "/cursos/cultivo-indoor", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
];

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemap(articles: ReturnType<typeof loadAllArticles>): string {
  const today = new Date().toISOString().slice(0, 10);

  const staticUrls = STATIC_PATHS.map(
    (p) => `  <url>
    <loc>${SITE}${p.path}</loc>
    <lastmod>${STATIC_LASTMOD}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  ).join("\n");

  const articleUrls = articles
    .map((a) => {
      const lastmod = a.dataModificacao || a.data || today;
      return `  <url>
    <loc>${SITE}/blog/${a.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${articleUrls}
</urlset>
`;
}

function buildImageSitemap(articles: ReturnType<typeof loadAllArticles>): string {
  const entries = articles
    .filter((a) => a.imagens && a.imagens.length > 0)
    .map((a) => {
      const imgs = a
        .imagens!.map(
          (img) => `    <image:image>
      <image:loc>${SITE}${img.src}</image:loc>
      <image:title>${escapeXml(img.alt)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`
        )
        .join("\n");
      return `  <url>
    <loc>${SITE}/blog/${a.slug}</loc>
${imgs}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries}
</urlset>
`;
}

const ROBOTS = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
Sitemap: ${SITE}/image-sitemap.xml
`;

// ── llms.txt: indice curado para motores de IA (GEO) ─────────────────────────
// Guias-pilares canonicos (estaveis; atualizar quando um novo pilar nascer).
const PILLAR_SLUGS = [
  "o-que-e-hidroponia-guia-definitivo-vantagens-tipos-e-como-co",
  "sistema-nft-de-hidroponia-o-que-e-como-funciona-e-como-dimen",
  "hidroponia-caseira-passo-a-passo-monte-seu-sistema-em-casa",
  "solucao-nutritiva-para-hidroponia-guia-completo-calculadora",
  "como-preparar-solucao-nutritiva-passo-a-passo-tabelas-para-1",
  "microgreens-guia-completo-de-cultivo-comercial-e-viabilidade",
  "guia-completo-de-alface-hidroponica-do-plantio-caseiro-a-pro",
  "guia-definitivo-de-horta-em-apartamento-luz-vasos-substrato",
  "calendario-de-plantio-o-que-plantar-em-cada-mes-do-ano",
];

function buildLlmsTxt(articles: ReturnType<typeof loadAllArticles>): string {
  const bySlug = new Map(articles.map((a) => [a.slug, a]));
  const line = (a: (typeof articles)[number]) =>
    `- [${a.titulo}](${SITE}/blog/${a.slug}): ${(a.resumo || "").replace(/\s+/g, " ").trim()}`;

  const pillars = PILLAR_SLUGS.map((s) => bySlug.get(s)).filter(Boolean) as typeof articles;
  const pillarSet = new Set(pillars.map((a) => a.slug));
  const rest = articles.filter((a) => !pillarSet.has(a.slug));

  return `# Cultivee

> A Cultivee é uma plataforma brasileira de cultivo inteligente: guias técnicos de hidroponia,
> horta em casa e agricultura urbana, cursos e produtos de automação de cultivo. O conteúdo é
> escrito por pesquisador, sempre com fontes citadas (Embrapa, IAC, SciELO, universidades).

Site: ${SITE} · Contato: contato@cultivee.com.br · Blog: ${SITE}/blog · Feed: ${SITE}/feed.xml

## Guias essenciais (pilares)

${pillars.map(line).join("\n")}

## Cursos e produtos

- [Curso de Microverdes](${SITE}/cursos/microverdes)
- [Curso de Hidroponia](${SITE}/cursos/hidroponia)
- [Curso de Cultivo Indoor](${SITE}/cursos/cultivo-indoor)
- [Produtos de automação de cultivo](${SITE}/produtos)

## Demais artigos (mais recentes primeiro)

${rest.map(line).join("\n")}
`;
}

// ── feed.xml: RSS 2.0 (sinal de freshness p/ agregadores e motores de IA) ────
function buildFeed(articles: ReturnType<typeof loadAllArticles>): string {
  const rfc822 = (iso: string) => new Date(`${iso}T09:00:00Z`).toUTCString();
  const items = articles.slice(0, 20).map((a) => `    <item>
      <title>${escapeXml(a.titulo)}</title>
      <link>${SITE}/blog/${a.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${a.slug}</guid>
      <pubDate>${rfc822(a.data)}</pubDate>
      <description>${escapeXml(a.resumo || "")}</description>
    </item>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog da Cultivee</title>
    <link>${SITE}/blog</link>
    <description>Guias técnicos de hidroponia, horta em casa e tecnologia de cultivo, com fontes citadas. Um artigo novo por dia.</description>
    <language>pt-BR</language>
    <lastBuildDate>${articles.length ? rfc822(articles[0].data) : new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

function writeIfDirExists(dir: string, file: string, content: string) {
  if (!fs.existsSync(dir)) return false;
  fs.writeFileSync(path.join(dir, file), content, "utf-8");
  return true;
}

function main() {
  const articles = loadAllArticles();
  const sitemap = buildSitemap(articles);
  const imageSitemap = buildImageSitemap(articles);
  const llms = buildLlmsTxt(articles);
  const feed = buildFeed(articles);

  const dist = path.join(PROJECT_ROOT, "dist");
  const pub = path.join(PROJECT_ROOT, "public");

  const files: [string, string][] = [
    ["sitemap.xml", sitemap],
    ["image-sitemap.xml", imageSitemap],
    ["robots.txt", ROBOTS],
    ["llms.txt", llms],
    ["feed.xml", feed],
  ];

  let wroteToDist = false;
  if (fs.existsSync(dist)) {
    for (const [name, content] of files) fs.writeFileSync(path.join(dist, name), content, "utf-8");
    wroteToDist = true;
  }
  for (const [name, content] of files) fs.writeFileSync(path.join(pub, name), content, "utf-8");

  const dest = wroteToDist ? "public/ + dist/" : "public/";
  console.log(
    `✓ Sitemap + llms.txt + feed.xml: ${articles.length} articles + ${STATIC_PATHS.length} static routes → ${dest}`
  );
}

main();
