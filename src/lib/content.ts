import toursJson from "@/content/tours.json";
import addedToursJson from "@/content/tours-added.json";
import tripsJson from "@/content/daytrips.json";
import postsJson from "@/content/posts.json";
import testimonialsJson from "@/content/testimonials.json";
import galleryJson from "@/content/gallery.json";
import hiddenJson from "@/content/hidden-tours.json";
import { TOUR_SEO } from "./seo";

export type Day = { day: number; dayEnd?: number; title: string; text: string };
export type Tour = {
  slug: string; name: string; origin: string; days: number; nights: number | null;
  seoTitle: string; seoDescription: string; overview: string[]; highlights: string[];
  itinerary: Day[]; includes: string[]; excludes: string[]; faqs: { q: string; a: string }[];
  hero: string; images: string[];
};
export type DayTrip = { slug: string; name: string; text: string; route: string };
export type Block = { t: "h" | "p"; x: string };
export type Post = {
  slug: string; title: string; seoTitle: string; description: string; date: string;
  modified: string; image: string | null; blocks: Block[];
};
export type Testimonial = { author: string; title: string; text: string };

// Tours marked `draft` in tours-added.json are written but not yet approved by the owner, so they are left out of the site
// (pages, sitemap, filters, counts) unless the build is started with SHOW_DRAFT_TOURS=1.
const showDrafts = process.env.SHOW_DRAFT_TOURS === "1";
const addedTours = (addedToursJson as (Tour & { draft?: boolean })[]).filter((t) => showDrafts || !t.draft);
// Search titles and descriptions are written by hand in seo.ts; they replace the ones imported from the old site.
const withSeo = (t: Tour): Tour => {
  const o = TOUR_SEO[t.slug];
  return o ? { ...t, seoTitle: o.title, seoDescription: o.description || t.seoDescription } : t;
};
// Live tours taken off the site so each departure city lists six. The legacy URL redirects send each one to the tour named here.
const hidden: Record<string, string> = hiddenJson;
export const tours = ([...toursJson, ...addedTours] as Tour[]).filter((t) => !(t.slug in hidden)).map(withSeo).sort((a, b) => b.days - a.days);
export const dayTrips = tripsJson as DayTrip[];
export const posts = (postsJson as Post[]).slice().sort((a, b) => +new Date(b.date) - +new Date(a.date));
export const testimonials = testimonialsJson as Testimonial[];
export const gallery = galleryJson as string[];

export const getTour = (slug: string) => tours.find((t) => t.slug === slug);
export const getTrip = (slug: string) => dayTrips.find((t) => t.slug === slug);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const tourLabel = (t: Pick<Tour, "days" | "nights">) => `${t.days} days${t.nights ? ` / ${t.nights} nights` : ""}`;

export function excerpt(s: string, n = 160) {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= n) return t;
  return t.slice(0, n).replace(/\s+\S*$/, "") + "…";
}

// One-line summaries for the home page cards. Each line uses only facts from the day trip text on atlasprivatetours.com.
export const tripBlurb: Record<string, string> = {
  meknes: "A quieter imperial city, with its souks, Place el-Hedim and the Dar Jamai Museum.",
  volubilis: "Ancient Roman ruins and a UNESCO World Heritage Site: the forum, basilica, baths and mosaics.",
  essaouira: "A walled Atlantic medina three hours from Marrakech, with its ramparts, fish market and seaport.",
  "ouzoud-waterfalls": "Waterfalls over 100 metres high in the Atlas, three hours from Marrakech.",
  "atlas-mountains": "Asni, Berber villages and mint tea in a local home, a day from Marrakech.",
  "ourika-valley": "Berber villages, waterfalls and green gardens, 30 km from Marrakech.",
  ouarzazate: "Across the High Atlas by the Tizi n’Tichka pass to Ait Ben Haddou and Taourirt Kasbah.",
  marrakech: "One of Morocco’s oldest imperial cities, set below the snow-capped High Atlas.",
  "morocco-desert": "A full day among the dunes, nomad life and Khamlia, the black village.",
};

// Day trip imagery: only images actually available on the existing site.
export const tripImage: Record<string, string> = {
  meknes: "/images/2017-12-atlas-private-tours-82.jpg",
  volubilis: "/images/2017-12-atlas-private-tours-72.jpg",
  essaouira: "/images/2017-12-atlas-private-tours-80.jpg",
  "ouzoud-waterfalls": "/images/2017-12-atlas-private-tours-88.jpg",
  "atlas-mountains": "/images/2017-12-atlas-private-tours-28.jpg",
  "ourika-valley": "/images/2017-12-atlas-private-tours-96.jpg",
  ouarzazate: "/images/2017-12-atlas-private-tours-87.jpg",
  marrakech: "/images/2017-12-atlas-private-tours-76.jpg",
  "morocco-desert": "/images/2017-12-atlas-private-tours-13.jpeg",
};

export const tourImageFallback = "/images/2017-12-atlas-private-tours-79.jpg";

// ---- Tour finder helpers -------------------------------------------------
export { STYLES, LENGTHS, joinCities, type Style } from "./filters";
import { ALL_ORIGINS, STYLES, type Style } from "./filters";

// Departure cities that have at least one visible tour, in display order.
export const origins = ALL_ORIGINS.filter((o) => tours.some((t) => t.origin === o));

export function tourStyles(t: Tour): Style[] {
  const titles = t.itinerary.map((d) => d.title).join(" ");
  const all = `${t.name} ${titles}`;
  const out: Style[] = [];
  const sahara = /merzouga|sahara|erg chebbi/i.test(all);
  const imperial = /rabat|meknes|volubilis|imperial/i.test(all);
  const blue = /chefchaouen|chaouen/i.test(all);
  const coast = /essaouira|oualidia|el jadida/i.test(titles);
  if (sahara && !imperial && !blue && !coast) out.push("Desert escape");
  if (sahara) out.push("Sahara desert");
  if (imperial) out.push("Imperial cities");
  if (blue) out.push("Blue city");
  if (coast) out.push("Atlantic coast");
  return out;
}

// Labels shown on cards and tour pages. "Desert escape" is a filter-only grouping and would repeat "Sahara desert".
export const styleLabels = (t: Tour): Style[] => tourStyles(t).filter((s) => s !== "Desert escape");

export type TourSummary = Pick<Tour, "slug" | "name" | "origin" | "days" | "nights" | "hero"> & { styles: Style[] };
export const tourSummaries: TourSummary[] = tours.map((t) => ({
  slug: t.slug, name: t.name, origin: t.origin, days: t.days, nights: t.nights, hero: t.hero, styles: tourStyles(t),
}));

// Departure-city landing pages (/tours/from/marrakech), which target searches like "morocco tours from marrakech".
export const cityPath = (city: string) => `/tours/from/${city.toLowerCase()}`;
export const cityTours = (city: string) => tours.filter((t) => t.origin === city);
