import type { MetadataRoute } from "next";
import { cityPath, cityTours, dayTrips, origins, posts, tourImageFallback, tours, tripImage } from "@/lib/content";
import { SITE } from "@/lib/site";
import { destinations } from "@/lib/destinations";

// Tours, destinations and day trips list their photo too, which helps them appear in image search.
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string, priority: number, opts: { lastModified?: string; image?: string } = {}): MetadataRoute.Sitemap[number] => ({
    url: SITE.url + p,
    priority,
    ...(opts.lastModified ? { lastModified: new Date(opts.lastModified) } : {}),
    ...(opts.image ? { images: [SITE.url + opts.image] } : {}),
  });
  return [
    u("/", 1),
    u("/tours", 0.9),
    ...origins.map((o) => u(cityPath(o), 0.8, { image: cityTours(o)[0].hero })),
    ...tours.map((t) => u(`/tours/${t.slug}`, 0.8, { image: t.hero })),
    u("/destinations", 0.8),
    ...destinations.map((d) => u(`/destinations/${d.slug}`, 0.7, { image: d.hero })),
    u("/day-trips", 0.7),
    ...dayTrips.map((d) => u(`/day-trips/${d.slug}`, 0.6, { image: tripImage[d.slug] ?? tourImageFallback })),
    u("/blog", 0.7),
    ...posts.map((p) => u(`/blog/${p.slug}`, 0.5, { lastModified: p.modified || p.date, ...(p.image ? { image: p.image } : {}) })),
    u("/about", 0.5), u("/contact", 0.6), u("/gallery", 0.3), u("/testimonials", 0.5), u("/privacy", 0.2),
  ];
}
