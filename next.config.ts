import type { NextConfig } from "next";
import tours from "./src/content/tours.json";
import posts from "./src/content/posts.json";
import imageMap from "./src/content/imagemap.json";
import hiddenJson from "./src/content/hidden-tours.json";

// Tours taken off the site (see src/lib/content.ts): their old URLs go to the replacement tour instead.
const hidden: Record<string, string> = hiddenJson;
const live = (slug: string) => hidden[slug] ?? slug;

// Permanent redirects from the legacy WordPress site, so existing rankings, backlinks and bookmarks carry over.
// Verify with: npm run start, then node scripts/check-redirects.mjs
type Redirect = NonNullable<Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>>[number];
// Legacy URLs ended in a slash. Matching both forms here, with skipTrailingSlashRedirect below, keeps every redirect to a single hop.
const S = (p: string) => `${p}{/}?`;
const R = (source: string, destination: string, extra: Partial<Redirect> = {}): Redirect =>
  ({ source, destination, statusCode: 301, ...extra }) as Redirect;

// path-to-regexp treats these characters as syntax, so literal file names need them escaped.
const esc = (s: string) => s.replace(/[()+?*:{}[\]]/g, "\\$&");

// Old tour URLs that the legacy site linked to or redirected through. Each points at the closest tour that exists today.
const ALIASES: Record<string, string> = {
  "5-days-desert-tour-from-marrakech-to-marrakech": "5-days-desert-tour-from-marrakech",
  "7-days-casablanca-via-fez-to-marrakech": "7-day-tour-from-casablanca-to-marrakech",
  "9-days-casablanca-rabat-fes-marrakech": "9-days-casablanca-rabat-fes-marrakech-desert",
  "3-days-from-marrakesh-to-fes": "3-days-tour-from-marrakech-to-fes-via-sahara",
  "4-days-marrakesh-to-fes": "4-day-tour-from-marrakesh-to-fes",
};

// Uploads that used to live at /wp-content/uploads/... now ship from /images/...
const uploads = Object.entries(imageMap as Record<string, string>).flatMap(([from, to]) => {
  try {
    const p = decodeURI(new URL(from).pathname);
    return p.startsWith("/wp-content/uploads/") ? [R(esc(p), to)] : [];
  } catch {
    return [];
  }
});

const nextConfig: NextConfig = {
  poweredByHeader: false,
  skipTrailingSlashRedirect: true,
  // A stray package-lock.json in the home folder made Next guess the wrong workspace root, so pin it here.
  turbopack: { root: process.cwd(), rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } } },
  images: { formats: ["image/avif", "image/webp"], qualities: [60, 75] },
  async redirects() {
    return [
      // One hop from www to the bare domain (HTTP to HTTPS is handled by the host).
      R("/:path*", "https://atlasprivatetours.com/:path*", { has: [{ type: "host", value: "www.atlasprivatetours.com" }] }),

      // Tours and posts moved under /tours and /blog.
      ...tours.map((t) => R(S(`/${t.slug}`), `/tours/${live(t.slug)}`)),
      ...Object.entries(ALIASES).map(([from, to]) => R(S(`/${from}`), `/tours/${live(to)}`)),
      // The tour pages themselves no longer exist for hidden tours.
      ...Object.entries(hidden).map(([from, to]) => R(S(`/tours/${from}`), `/tours/${to}`)),
      ...posts.map((p) => R(S(`/${p.slug}`), `/blog/${p.slug}`)),

      // Renamed pages.
      R(S("/morocco-tours"), "/tours"),
      R(S("/about-us"), "/about"),
      R(S("/contact-us"), "/contact"),
      R(S("/home"), "/"),

      // WordPress archives and feeds that have no equivalent now.
      R("/category/:slug*", "/blog"),
      R("/tag/:slug*", "/blog"),
      R("/author/:slug*", "/blog"),
      R(S("/blog/page/:n"), "/blog"),
      R(S("/feed"), "/blog"),
      R(S("/comments/feed"), "/blog"),
      R(S("/day-trips/page/:n"), "/day-trips"),

      ...uploads,

      // Anything else that ends in a slash goes to the slash-free page, which is the canonical form.
      R("/:path+/", "/:path+"),
    ];
  },
};
export default nextConfig;
