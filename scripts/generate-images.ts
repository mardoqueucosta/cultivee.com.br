import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { loadAllArticles, PROJECT_ROOT } from "./_load-articles";

const PUBLIC_BLOG = path.join(PROJECT_ROOT, "public", "blog");
const VARIANTS_OUT = path.join(PROJECT_ROOT, "src/data/image-variants.json");
const BLUR_OUT = path.join(PROJECT_ROOT, "src/data/blur-data.json");

const WIDTHS = [640, 768, 1024];
const FORMATS: ("avif" | "webp")[] = ["avif", "webp"];

interface VariantManifest {
  base: string;
  widths: number[];
  formats: ("avif" | "webp")[];
}

async function processOne(srcPath: string, publicSrc: string) {
  const ext = path.extname(srcPath).toLowerCase();
  const base = publicSrc.replace(new RegExp(`${ext}$`), "");
  const baseFs = srcPath.replace(new RegExp(`${ext}$`), "");

  for (const width of WIDTHS) {
    for (const fmt of FORMATS) {
      const outPath = `${baseFs}-${width}.${fmt}`;
      if (fs.existsSync(outPath)) continue;
      await sharp(srcPath)
        .resize({ width, withoutEnlargement: true })
        .toFormat(fmt, { quality: fmt === "avif" ? 60 : 78 })
        .toFile(outPath);
    }
  }

  const blurBuf = await sharp(srcPath)
    .resize({ width: 24, fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer();
  const blurDataUri = `data:image/webp;base64,${blurBuf.toString("base64")}`;

  return {
    publicSrc,
    variant: { base, widths: WIDTHS, formats: FORMATS } as VariantManifest,
    blur: blurDataUri,
  };
}

async function main() {
  const articles = loadAllArticles();
  const sources = new Set<string>();
  for (const a of articles) {
    if (a.imagens) for (const img of a.imagens) sources.add(img.src);
  }

  const variants: Record<string, VariantManifest> = {};
  const blurMap: Record<string, string> = {};

  for (const publicSrc of sources) {
    const fsPath = path.join(PROJECT_ROOT, "public", publicSrc.replace(/^\//, ""));
    if (!fs.existsSync(fsPath)) {
      console.warn(`✗ Missing source: ${fsPath}`);
      continue;
    }
    process.stdout.write(`  ${publicSrc}... `);
    const r = await processOne(fsPath, publicSrc);
    variants[r.publicSrc] = r.variant;
    blurMap[r.publicSrc] = r.blur;
    console.log("ok");
  }

  fs.writeFileSync(VARIANTS_OUT, JSON.stringify(variants, null, 2) + "\n");
  fs.writeFileSync(BLUR_OUT, JSON.stringify(blurMap, null, 2) + "\n");

  console.log(
    `✓ Processed ${Object.keys(variants).length} images × ${WIDTHS.length} widths × ${FORMATS.length} formats`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
