import { testimonials, type Testimonial } from "./content";

// Which trip each Tripadvisor review is about, read from the review text itself.
// "exact": the reviewer describes this tour. "similar": same kind of journey but a different length or route.
// Reviews that do not say which trip they took are left out and only used as general guest stories.
type Link = { tours?: string[]; trips?: string[]; match: "exact" | "similar"; trip: string };

const LINKS: Record<string, Link> = {
  "Amut S": { tours: ["3-days-from-fes-to-marrakech-desert-trip"], match: "exact", trip: "3 days from Fes to Marrakech" },
  "Larisa C": { tours: ["3-days-from-fes-to-marrakech-desert-trip"], match: "exact", trip: "3 days from Fes to Marrakech" },
  Mariuspt: { tours: ["3-days-from-fes-to-marrakech-desert-trip"], match: "exact", trip: "3-day desert tour from Fes to Marrakech" },
  PaulineR0722: { tours: ["3-days-from-marrakech-to-desert-merzouga"], match: "exact", trip: "3 days between Marrakech and Merzouga" },
  Basya: { tours: ["3-days-tour-from-marrakech-to-fes-via-sahara"], match: "exact", trip: "3-day desert trip from Marrakech via Ouarzazate and Merzouga to Fes" },
  DLOttawa: {
    tours: ["10-day-tour-itinerary-from-casablanca", "7-day-tour-from-casablanca-to-marrakech"],
    match: "similar",
    trip: "11-day tour from Casablanca through the Sahara to Marrakech",
  },
  "Hemini T": { trips: ["atlas-mountains"], match: "exact", trip: "Atlas Mountains day trip" },
};

export type MatchedReview = Testimonial & { match: "exact" | "similar"; trip: string };

const withLink = (t: Testimonial): MatchedReview | null => {
  const l = LINKS[t.author];
  return l ? { ...t, match: l.match, trip: l.trip } : null;
};

export function reviewsForTour(slug: string): MatchedReview[] {
  return testimonials
    .filter((t) => LINKS[t.author]?.tours?.includes(slug))
    .map((t) => withLink(t)!)
    .sort((a, b) => (a.match === b.match ? 0 : a.match === "exact" ? -1 : 1));
}

export function reviewsForTrip(slug: string): MatchedReview[] {
  return testimonials.filter((t) => LINKS[t.author]?.trips?.includes(slug)).map((t) => withLink(t)!);
}

export const generalReviews = (n = 2) => testimonials.filter((t) => !LINKS[t.author]).slice(0, n);

export function tripLinkFor(author: string): { href: string; label: string } | null {
  const l = LINKS[author];
  if (!l) return null;
  if (l.match === "exact" && l.tours?.[0]) return { href: `/tours/${l.tours[0]}`, label: "View this tour" };
  if (l.match === "exact" && l.trips?.[0]) return { href: `/day-trips/${l.trips[0]}`, label: "View this day trip" };
  return null;
}

export function tripInfo(author: string): { match: "exact" | "similar"; trip: string } | null {
  const l = LINKS[author];
  return l ? { match: l.match, trip: l.trip } : null;
}
