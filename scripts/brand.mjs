// Builds web-ready logo variants from the supplied master PNG.
import sharp from "sharp";
const SRC = process.argv[2];
const OUT = "public/brand";

const master = sharp(SRC).ensureAlpha();
const trimmed = await master.clone().trim({ threshold: 40 }).toBuffer({ resolveWithObject: true });
console.log("trimmed", trimmed.info.width, trimmed.info.height);
const { width: W, height: H } = trimmed.info;

// Light-background version: as supplied, trimmed.
const light = sharp(trimmed.data).resize({ width: 1200 });
await light.clone().png().toFile(`${OUT}/atlas-logo.png`);
await light.clone().webp({ quality: 90, alphaQuality: 95 }).toFile(`${OUT}/atlas-logo.webp`);

// Dark-background version: recolour the dark-green lettering to sand. Artwork (mountains, kasbah, palms, gold) is untouched.
const { data, info } = await sharp(trimmed.data).raw().toBuffer({ resolveWithObject: true });
const ch = info.channels;
const textTopLeft = Math.round(H * 0.375); // letters A-T-L-A start here
const textTopRight = Math.round(H * 0.47); // the S sits under the palms, so start lower // lettering sits below the artwork's baseline
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * ch;
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const lum = 0.3 * r + 0.59 * g + 0.11 * b;
    const darkGreen = g >= r && g >= b * 0.9 && lum < 95;
    const inText = y > (x > info.width * 0.62 ? textTopRight : textTopLeft); // keep palms and shrubs green
    if (darkGreen && inText) { data[i] = 246; data[i + 1] = 239; data[i + 2] = 228; }
  }
}
const dark = sharp(data, { raw: { width: info.width, height: info.height, channels: ch } }).resize({ width: 1200 });
await dark.clone().png().toFile(`${OUT}/atlas-logo-dark.png`);
await dark.clone().webp({ quality: 90, alphaQuality: 95 }).toFile(`${OUT}/atlas-logo-dark.webp`);

// Artwork-only crop (mountains + kasbah) for icons.
const top = await sharp(trimmed.data).extract({ left: 0, top: 0, width: W, height: Math.round(H * 0.42) }).toBuffer();
const art = await sharp(top).trim({ threshold: 40 }).toBuffer({ resolveWithObject: true });
console.log("art", art.info.width, art.info.height);
// Icons use the kasbah and palm, the most recognisable part of the artwork at tiny sizes.
const cut = Math.round(art.info.width * 0.57);
const kasbah = await sharp(art.data).extract({ left: cut, top: 0, width: art.info.width - cut, height: art.info.height }).toBuffer();
const plate = (size, radius) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#120e0b"/></svg>`);
const makeIcon = async (size, radius, inner) =>
  sharp(plate(size, radius))
    .composite([{ input: await sharp(kasbah).resize({ width: inner, height: inner, fit: "inside" }).toBuffer(), gravity: "centre" }])
    .png()
    .toBuffer();
await sharp(await makeIcon(512, 110, 400)).toFile(`${OUT}/icon-512.png`);
await sharp(await makeIcon(180, 0, 140)).toFile("src/app/apple-icon.png");
await sharp(await makeIcon(512, 110, 400)).resize(96).png().toFile("src/app/icon.png");

const meta = await sharp(`${OUT}/atlas-logo.png`).metadata();
console.log("final", meta.width, meta.height);
