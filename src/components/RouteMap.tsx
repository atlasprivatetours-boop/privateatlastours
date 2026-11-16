import outline from "@/content/map-outline.json";
import type { Tour } from "@/lib/content";
import { tourRoute } from "@/lib/route";

const dayLabel = (days: number[]) => (days.length > 1 ? `${days[0]}–${days[days.length - 1]}` : String(days[0]));

export default function RouteMap({ tour }: { tour: Tour }) {
  const r = tourRoute(tour);
  if (!r) return null;
  const { width: W, height: H } = outline;
  const nights = new Map(r.stops.map((s) => [s.name, s]));

  // Crop the viewBox to the route with some padding so short routes are not tiny.
  const xs = r.points.map((p) => p.x), ys = r.points.map((p) => p.y);
  const pad = 70, padX = 130;
  let x0 = Math.max(0, Math.min(...xs) - padX), x1 = Math.min(W, Math.max(...xs) + padX);
  let y0 = Math.max(0, Math.min(...ys) - pad), y1 = Math.min(H, Math.max(...ys) + pad);
  const minW = 300, minH = 240;
  if (x1 - x0 < minW) { const c = (x0 + x1) / 2; x0 = Math.max(0, c - minW / 2); x1 = Math.min(W, x0 + minW); }
  if (y1 - y0 < minH) { const c = (y0 + y1) / 2; y0 = Math.max(0, c - minH / 2); y1 = Math.min(H, y0 + minH); }
  const vw = x1 - x0, vh = y1 - y0;

  const textFor = (side: string, minor: boolean) => {
    const o = minor ? 7 : 11;
    const m = { l: { dx: -o, dy: 4, a: "end" }, r: { dx: o, dy: 4, a: "start" }, t: { dx: 0, dy: -o - 2, a: "middle" }, b: { dx: 0, dy: o + 9, a: "middle" } } as const;
    return m[side as "l"];
  };
  const fs = Math.max(8, vw / 42);

  const summary = r.points.map((p) => p.name).join(", ");
  return (
    <figure className="m-0">
      <svg viewBox={`${x0} ${y0} ${vw} ${vh}`} role="img" aria-label={`Sketch map of the route: ${summary}`} className="mx-auto h-auto max-h-[34rem] w-full bg-[#dfe6e4]">
        <path d={outline.neighbours} fill="#ede3cc" />
        <path d={outline.morocco} fill="#f8efdc" stroke="#cdbd9f" strokeWidth={vw / 400} strokeLinejoin="round" />
        <path d={r.path} fill="none" stroke="#a64311" strokeWidth={vw / 150} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${vw / 55} ${vw / 90}`} opacity=".9" />
        {r.points.map((p) => {
          const n = nights.get(p.name);
          const t = textFor(p.side, p.minor && !n);
          return (
            <g key={p.name}>
              <circle cx={p.x} cy={p.y} r={n ? fs * 0.95 : fs * 0.38} fill={n ? "#0e2211" : "#a64311"} stroke={n ? "#c08030" : "#f8efdc"} strokeWidth={fs * 0.12} />
              {n && <text x={p.x} y={p.y + fs * 0.32} textAnchor="middle" fontSize={fs * 0.82} fill="#f8efdc" fontWeight="700">{dayLabel(n.days)}</text>}
              <text
                x={p.x + t.dx * (fs / 11) * (n ? 1.7 : 1)}
                y={p.y + t.dy * (fs / 11) + (n && (p.side === "t" || p.side === "b") ? (p.side === "t" ? -fs * 0.9 : fs * 0.9) : 0)}
                textAnchor={t.a}
                fontSize={p.minor && !n ? fs * 0.82 : fs}
                fill="#132e17"
                fontWeight={n ? 700 : 500}
                paintOrder="stroke"
                stroke="#f8efdc"
                strokeWidth={fs * 0.28}
                strokeLinejoin="round"
              >
                {p.name}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">
        Route sketched from the day-by-day itinerary, not to scale. Numbered dots mark the day you end in each place.
      </figcaption>
    </figure>
  );
}
