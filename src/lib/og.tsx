import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_TYPE = "image/png";

const W = 1200;
const H = 630;
// Paths are scoped to one folder each, so the build does not trace the whole project into the server bundle.
const readPublic = (p: string) => readFileSync(join(process.cwd(), "public", p));
const readFont = (name: string) => readFileSync(join(process.cwd(), "src", "assets", "fonts", name));

function dataUri(src: string) {
  try {
    const mime = /\.png$/i.test(src) ? "image/png" : "image/jpeg";
    return `data:${mime};base64,${readPublic(src).toString("base64")}`;
  } catch {
    return null;
  }
}

export function ogImage({ title, eyebrow, meta, image }: { title: string; eyebrow?: string; meta?: string; image: string }) {
  const bg = dataUri(image);
  const logo = dataUri("/brand/atlas-logo-dark.png");
  const serif = readFont("cormorant-600.ttf");
  const sans = readFont("hanken-500.ttf");
  const size = title.length > 90 ? 58 : title.length > 60 ? 70 : title.length > 36 ? 84 : 104;
  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: "flex", position: "relative", background: "#0e2211", fontFamily: "Hanken" }}>
        {bg && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bg} alt="" width={W} height={H} style={{ position: "absolute", top: 0, left: 0, width: W, height: H, objectFit: "cover" }} />
        )}
        <div style={{ position: "absolute", top: 0, left: 0, width: W, height: H, display: "flex", backgroundImage: "linear-gradient(to bottom, rgba(14,34,17,0.62), rgba(14,34,17,0.28) 30%, rgba(14,34,17,0.9) 72%, rgba(14,34,17,0.97))" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: W, height: H, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "52px 72px 56px" }}>
          <div style={{ display: "flex" }}>
            {logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt="" width={264} height={144} style={{ width: 264, height: 144 }} />
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: "#fff" }}>
            {eyebrow && <div style={{ fontSize: 22, letterSpacing: 6, color: "#e0a060", textTransform: "uppercase", marginBottom: 14 }}>{eyebrow}</div>}
            <div style={{ fontFamily: "Cormorant", fontSize: size, lineHeight: 1.02, maxWidth: 1040 }}>{title}</div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 26, fontSize: 24, color: "rgba(248,239,220,0.9)" }}>
              <div style={{ width: 56, height: 3, background: "#a64311", marginRight: 20 }} />
              {meta ?? "atlasprivatetours.com"}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Cormorant", data: serif, weight: 600, style: "normal" },
        { name: "Hanken", data: sans, weight: 500, style: "normal" },
      ],
    },
  );
}
