import fs from "node:fs";
import path from "node:path";
import { loadAllArticles, PROJECT_ROOT } from "./_load-articles";

const SITE = "https://cultivee.com.br";

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
    <lastmod>${today}</lastmod>
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

function writeIfDirExists(dir: string, file: string, content: string) {
  if (!fs.existsSync(dir)) return false;
  fs.writeFileSync(path.join(dir, file), content, "utf-8");
  return true;
}

function main() {
  const articles = loadAllArticles();
  const sitemap = buildSitemap(articles);
  const imageSitemap = buildImageSitemap(articles);

  const dist = path.join(PROJECT_ROOT, "dist");
  const pub = path.join(PROJECT_ROOT, "public");

  let wroteToDist = false;
  if (fs.existsSync(dist)) {
    fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap, "utf-8");
    fs.writeFileSync(path.join(dist, "image-sitemap.xml"), imageSitemap, "utf-8");
    fs.writeFileSync(path.join(dist, "robots.txt"), ROBOTS, "utf-8");
    wroteToDist = true;
  }

  fs.writeFileSync(path.join(pub, "sitemap.xml"), sitemap, "utf-8");
  fs.writeFileSync(path.join(pub, "image-sitemap.xml"), imageSitemap, "utf-8");
  fs.writeFileSync(path.join(pub, "robots.txt"), ROBOTS, "utf-8");

  const dest = wroteToDist ? "public/ + dist/" : "public/";
  console.log(
    `✓ Sitemap generated: ${articles.length} articles + ${STATIC_PATHS.length} static routes → ${dest}`
  );
}

main();
