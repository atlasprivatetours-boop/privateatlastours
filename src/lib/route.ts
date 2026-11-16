import type { Tour } from "./content";

// Same projection used by scripts that generated src/content/map-outline.json.
const LAT_MAX = 35.5;
const LON_MIN = -10.1;
const K = 100;
const COS = Math.cos((32.8 * Math.PI) / 180);
const project = (lat: number, lon: number): [number, number] => [(lon - LON_MIN) * K * COS, (LAT_MAX - lat) * K];

type Side = "l" | "r" | "t" | "b";
type Place = { name: string; re: RegExp; lat: number; lon: number; side: Side; minor?: boolean };

// Well-known places only. Anything a day title mentions that is not listed here is simply left off the sketch.
const PLACES: Place[] = [
  { name: "Casablanca", re: /casablanca/i, lat: 33.5731, lon: -7.5898, side: "l" },
  { name: "Rabat", re: /rabat/i, lat: 34.0209, lon: -6.8416, side: "l" },
  { name: "Chefchaouen", re: /chefchaouen/i, lat: 35.1688, lon: -5.2636, side: "r" },
  { name: "Volubilis", re: /volubilis/i, lat: 34.0722, lon: -5.5546, side: "t", minor: true },
  { name: "Meknes", re: /meknes/i, lat: 33.8935, lon: -5.5473, side: "l", minor: true },
  { name: "Fes", re: /\bfes\b|\bfez\b/i, lat: 34.0331, lon: -5.0003, side: "r" },
  { name: "Ifrane", re: /ifran/i, lat: 33.5228, lon: -5.1106, side: "r", minor: true },
  { name: "Azrou", re: /azrou/i, lat: 33.4342, lon: -5.221, side: "l", minor: true },
  { name: "Beni Mellal", re: /beni mellal/i, lat: 32.3373, lon: -6.3498, side: "l", minor: true },
  { name: "Ouzoud", re: /ouzoud/i, lat: 32.0124, lon: -6.7186, side: "t", minor: true },
  { name: "Essaouira", re: /essaouira/i, lat: 31.5085, lon: -9.7595, side: "t" },
  { name: "Safi", re: /\bsafi\b/i, lat: 32.2994, lon: -9.2372, side: "l", minor: true },
  { name: "Oualidia", re: /oualidia/i, lat: 32.7339, lon: -9.0364, side: "l", minor: true },
  { name: "El Jadida", re: /el jadida/i, lat: 33.2316, lon: -8.5007, side: "l", minor: true },
  { name: "Marrakech", re: /marrakech|marrakesh/i, lat: 31.6295, lon: -7.9811, side: "l" },
  { name: "Tizi n’Tichka", re: /tizi|tichka/i, lat: 31.305, lon: -7.364, side: "t", minor: true },
  { name: "Telouet", re: /telouet/i, lat: 31.289, lon: -7.25, side: "r", minor: true },
  { name: "Ait Ben Haddou", re: /ait\s?ben\s?haddou|aitbenhaddou|ait benhaddou/i, lat: 31.047, lon: -7.131, side: "l", minor: true },
  { name: "Ouarzazate", re: /ouarzazate/i, lat: 30.9189, lon: -6.8934, side: "b" },
  { name: "Skoura", re: /skoura/i, lat: 31.062, lon: -6.566, side: "b", minor: true },
  { name: "Agdz", re: /agdz|agdez/i, lat: 30.701, lon: -6.443, side: "b", minor: true },
  { name: "Kelaa M’Gouna", re: /kelaa/i, lat: 31.234, lon: -6.126, side: "r", minor: true },
  { name: "Dades", re: /dades|boumalne/i, lat: 31.42, lon: -5.98, side: "l" },
  { name: "Todra Gorges", re: /todra|toudra|tinghir|tinjdad/i, lat: 31.587, lon: -5.588, side: "t", minor: true },
  { name: "Midelt", re: /midelt/i, lat: 32.6852, lon: -4.745, side: "r", minor: true },
  { name: "Errachidia", re: /errachidia/i, lat: 31.9314, lon: -4.4244, side: "r", minor: true },
  { name: "Erfoud", re: /erfoud/i, lat: 31.4319, lon: -4.2282, side: "t", minor: true },
  { name: "Rissani", re: /rissani/i, lat: 31.28, lon: -4.27, side: "l", minor: true },
  { name: "Merzouga", re: /merzouga|sahara|erg[\s-]?chebbi/i, lat: 31.0993, lon: -4.0125, side: "b" },
];

export type RoutePoint = { name: string; x: number; y: number; side: Side; minor: boolean };
export type RouteStop = RoutePoint & { days: number[] };
// `end` comes from the full sequence of places, so a route that returns to an earlier stop still ends where it really ends.
export type TourRoute = { points: RoutePoint[]; stops: RouteStop[]; path: string; end: string };

function placesIn(text: string): Place[] {
  const hits: { p: Place; i: number }[] = [];
  for (const p of PLACES) {
    const m = text.match(p.re);
    if (m && m.index !== undefined) hits.push({ p, i: m.index });
  }
  return hits.sort((a, b) => a.i - b.i).map((h) => h.p);
}

export function tourRoute(t: Tour): TourRoute | null {
  const seq: Place[] = [];
  const overnight: { day: number; place: Place }[] = [];
  for (const d of t.itinerary) {
    const found = placesIn(d.title);
    for (const p of found) if (seq[seq.length - 1] !== p) seq.push(p);
    const last = found[found.length - 1];
    if (last) overnight.push({ day: d.day, place: last });
  }
  if (seq.length < 2) return null;

  const pt = (p: Place): RoutePoint => {
    const [x, y] = project(p.lat, p.lon);
    return { name: p.name, x, y, side: p.side, minor: !!p.minor };
  };
  const unique = [...new Map(seq.map((p) => [p.name, p])).values()].map(pt);

  // Overnights: group the days spent in the same place.
  const byName = new Map<string, RouteStop>();
  for (const o of overnight) {
    const base = pt(o.place);
    const s = byName.get(base.name) ?? { ...base, days: [] };
    s.days.push(o.day);
    byName.set(base.name, s);
  }
  const path = seq.map((p, i) => {
    const [x, y] = project(p.lat, p.lon);
    return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join("");
  return { points: unique, stops: [...byName.values()], path, end: seq[seq.length - 1].name };
}
