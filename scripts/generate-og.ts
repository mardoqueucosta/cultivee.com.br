import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { loadAllArticles, PROJECT_ROOT } from "./_load-articles";

const OG_DIR = path.join(PROJECT_ROOT, "public", "og");

const COLORS = {
  agro: { primary: "#22c55e", text: "#14532d" },
  educa: { primary: "#3b82f6", text: "#1e3a8a" },
  tech: { primary: "#f97316", text: "#7c2d12" },
};

async function loadFont(): Promise<Buffer> {
  const local = path.join(
    PROJECT_ROOT,
    "node_modules/@fontsource/inter/files/inter-latin-700-normal.woff"
  );
  if (fs.existsSync(local)) return fs.readFileSync(local);
  throw new Error(
    `Inter font not found at ${local}. Run: npm install -D @fontsource/inter`
  );
}

async function buildOgImage(
  titulo: string,
  categoria: string,
  variant: keyof typeof COLORS,
  fontData: ArrayBuffer
): Promise<Buffer> {
  const { primary, text } = COLORS[variant];

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${primary}15 0%, white 50%, ${primary}10 100%)`,
          padding: "80px",
          fontFamily: "Inter",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "16px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: "16px",
                      height: "16px",
                      borderRadius: "9999px",
                      background: primary,
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "28px",
                      fontWeight: 700,
                      color: text,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    },
                    children: categoria,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: titulo.length > 80 ? "56px" : titulo.length > 50 ? "68px" : "80px",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.1,
                maxWidth: "1040px",
                display: "flex",
              },
              children: titulo,
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#475569",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: { fontSize: "32px", fontWeight: 700, color: primary },
                    children: "Cultivee",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: { fontSize: "22px", fontWeight: 500 },
                    children: "cultivee.com.br/blog",
                  },
                },
              ],
            },
          },
        ],
      },
    } as any,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: fontData, weight: 700, style: "normal" }],
    }
  );

  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } })
    .render()
    .asPng();
  return Buffer.from(png);
}

async function main() {
  const articles = loadAllArticles();
  if (!fs.existsSync(OG_DIR)) fs.mkdirSync(OG_DIR, { recursive: true });

  const fontData = await loadFont();

  for (const a of articles) {
    const out = path.join(OG_DIR, `${a.slug}.png`);
    process.stdout.write(`  ${a.slug}.png... `);
    const buf = await buildOgImage(
      a.titulo,
      a.categoria,
      (a.categoriaVariant as keyof typeof COLORS) ?? "agro",
      fontData
    );
    fs.writeFileSync(out, buf);
    console.log("ok");
  }

  console.log(`✓ Generated ${articles.length} OG images at /public/og/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
