import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const manifest = {};
let originals = 0;
let largestVariants = 0;
async function visit(directory) {
  for (const entry of await readdir(path.join(root, "public", directory), { withFileTypes: true })) {
    const relative = path.posix.join(directory, entry.name);
    if (entry.isDirectory()) { await visit(relative); continue; }
    if (!/\.jpe?g$/i.test(entry.name)) continue;
    const input = path.join(root, "public", relative);
    const { width, height } = await sharp(input).metadata();
    const widths = [...new Set([Math.min(640, width), Math.min(1200, width)])];
    const variants = [];
    for (const size of widths) {
      const url = `/optimized/${relative.replace(/\.jpe?g$/i, "")}-${size}.webp`;
      const output = path.join(root, "public", url);
      await mkdir(path.dirname(output), { recursive: true });
      await sharp(input).resize({ width: size, withoutEnlargement: true }).webp({ quality: 85, effort: 5 }).toFile(output);
      variants.push(`${url} ${size}w`);
      if (size === widths.at(-1)) largestVariants += (await stat(output)).size;
    }
    originals += (await stat(input)).size;
    manifest[`/${relative}`] = { width, height, srcSet: variants.join(", ") };
  }
}
await visit("shots");
await visit("certs");
await writeFile(path.join(root, "src/data/image-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Images: ${Object.keys(manifest).length}; originals ${(originals / 1024).toFixed(0)} KiB; largest WebP variants ${(largestVariants / 1024).toFixed(0)} KiB (${(100 - largestVariants / originals * 100).toFixed(0)}% less).`);
