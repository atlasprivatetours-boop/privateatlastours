import { SITE } from "./site";
import type { Tour, Post, DayTrip } from "./content";
import { excerpt, joinCities, origins } from "./content";
import { tourRoute } from "./route";

// Structured data. Everything here restates what the page already shows. There are no ratings, prices, awards or review
// counts, because the site does not publish verified figures for them.
const abs = (p: string) => (p.startsWith("http") ? p : SITE.url + p);
const ORG = { "@id": `${SITE.url}/#organization` };
const SITE_REF = { "@id": `${SITE.url}/#website` };

export const orgSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  "@id": `${SITE.url}/#organization`,
  name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email,
  slogan: SITE.tagline,
  description: "Local Moroccan Berber travel agency based in Fes offering private, tailor-made tours across Morocco.",
  image: abs("/images/2017-12-atlas-private-tours-13.jpeg"),
  logo: { "@type": "ImageObject", url: abs("/brand/atlas-logo.png"), width: 1200, height: 653 },
  address: { "@type": "PostalAddress", addressLocality: "Fes", addressCountry: "MA" },
  areaServed: { "@type": "Country", name: "Morocco" },
  contactPoint: [{
    "@type": "ContactPoint", contactType: "customer service", telephone: SITE.phone, email: SITE.email,
    availableLanguage: ["English", "French"], url: abs("/contact"),
  }],
  knowsLanguage: ["en", "fr"],
  knowsAbout: ["Private tours in Morocco", "Sahara desert tours", "Imperial cities of Morocco", `Day trips from ${joinCities(origins)}`],
  sameAs: [SITE.facebook, SITE.tripadvisor],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE.url}/#website`,
  url: SITE.url, name: SITE.name, inLanguage: "en", publisher: ORG,
});

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

// A plain page: WebPage, AboutPage, ContactPage or CollectionPage.
export const pageSchema = (type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage", name: string, path: string, description: string, extra: Record<string, unknown> = {}) => ({
  "@context": "https://schema.org", "@type": type, "@id": `${abs(path)}#webpage`,
  url: abs(path), name, description, inLanguage: "en", isPartOf: SITE_REF, about: ORG, ...extra,
});

// A list page (tours, day trips, destinations) with its items as an ItemList, which also helps AI answers cite the right URL.
export const listSchema = (name: string, path: string, description: string, items: { name: string; path: string; image?: string }[]) =>
  pageSchema("CollectionPage", name, path, description, {
    mainEntity: {
      "@type": "ItemList", numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, url: abs(it.path), name: it.name, ...(it.image ? { image: abs(it.image) } : {}) })),
    },
  });

export const tourSchema = (t: Tour) => {
  const route = tourRoute(t);
  const props = [
    { "@type": "PropertyValue", name: "Duration", value: `${t.days} ${t.days === 1 ? "day" : "days"}`, unitText: "days" },
    { "@type": "PropertyValue", name: "Starts in", value: t.origin },
    ...(route ? [{ "@type": "PropertyValue", name: "Ends in", value: route.end }] : []),
  ];
  const stay = new Map<number, string>();
  route?.stops.forEach((s) => s.days.forEach((d) => stay.set(d, s.name)));
  return {
    "@context": "https://schema.org", "@type": "TouristTrip", "@id": `${abs(`/tours/${t.slug}`)}#trip`,
    name: t.name, url: abs(`/tours/${t.slug}`), mainEntityOfPage: abs(`/tours/${t.slug}`),
    image: [t.hero, ...t.images.filter((u) => u !== t.hero).slice(0, 5)].map(abs),
    description: t.seoDescription || t.overview[0] || t.itinerary[0]?.text || t.name,
    inLanguage: "en", touristType: "Private group", provider: ORG, isPartOf: SITE_REF,
    additionalProperty: props,
    itinerary: {
      "@type": "ItemList", numberOfItems: t.itinerary.length,
      itemListElement: t.itinerary.map((d, i) => ({
        "@type": "ListItem", position: i + 1, name: `Day ${d.day}: ${d.title}`, description: d.text.slice(0, 300),
        ...(stay.get(d.day) ? { item: { "@type": "Place", name: stay.get(d.day) } } : {}),
      })),
    },
  };
};

export const dayTripSchema = (d: DayTrip) => ({
  "@context": "https://schema.org", "@type": "TouristTrip", "@id": `${abs(`/day-trips/${d.slug}`)}#trip`,
  name: `${d.name} day trip`, url: abs(`/day-trips/${d.slug}`), mainEntityOfPage: abs(`/day-trips/${d.slug}`),
  description: excerpt(d.text, 300), inLanguage: "en", touristType: "Private group", provider: ORG, isPartOf: SITE_REF,
  additionalProperty: [{ "@type": "PropertyValue", name: "Duration", value: "1 day", unitText: "days" }],
});

export const destinationSchema = (d: { slug: string; name: string; intro: string; hero: string; see: string[] }) => ({
  "@context": "https://schema.org", "@type": "TouristDestination", "@id": `${abs(`/destinations/${d.slug}`)}#destination`,
  name: d.name, description: d.intro, url: abs(`/destinations/${d.slug}`), image: abs(d.hero),
  touristType: "Private tours", containedInPlace: { "@type": "Country", name: "Morocco" },
  includesAttraction: d.see.map((s) => ({ "@type": "TouristAttraction", name: s })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const articleSchema = (p: Post) => ({
  "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.description,
  datePublished: p.date, dateModified: p.modified || p.date, inLanguage: "en",
  image: abs(p.image || "/images/2017-12-atlas-private-tours-13.jpeg"),
  mainEntityOfPage: abs(`/blog/${p.slug}`), isPartOf: SITE_REF,
  author: ORG, publisher: ORG,
});
