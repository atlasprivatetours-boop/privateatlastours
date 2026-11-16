import { dayTrips, joinCities, origins, tours } from "@/lib/content";
import { destinations } from "@/lib/destinations";
import { SITE } from "@/lib/site";

// A plain-text summary for AI assistants (llms.txt). It is optional and no search engine ranks on it, but it gives
// language models a clean list of what this business offers and where to find it. Facts only, taken from the site itself.
export const dynamic = "force-static";

export function GET() {
  const u = (p: string) => SITE.url + p;
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.tagline}. A local Berber travel agency based in ${SITE.base}, with ${SITE.experience} of experience designing private tours across Morocco. Every tour is private (your own driver-guide and vehicle) and can be adjusted to your dates, pace and interests.`,
    "",
    "## Key facts",
    `- Starting cities: ${joinCities(origins)}.`,
    `- Tours run from 2 to 10 days; day trips last one day.`,
    `- Contact: ${SITE.phone} (phone and WhatsApp), ${SITE.email}. Support is available seven days a week.`,
    `- Reviews: guest reviews originally posted on Tripadvisor, ${SITE.tripadvisor}`,
    "- Prices are not published on the website. Ask for a quote through the enquiry form.",
    "",
    "## Main pages",
    `- [Private Morocco tours](${u("/tours")}): all ${tours.length} private tours with day-by-day itineraries, route maps and what is included.`,
    `- [Destinations](${u("/destinations")}): the places on our routes.`,
    `- [Day trips](${u("/day-trips")}): single-day private trips.`,
    `- [Journal](${u("/blog")}): Morocco travel guides.`,
    `- [About](${u("/about")}) and [Contact and plan your journey](${u("/contact")}).`,
    "",
    "## Tours",
    ...tours.map((t) => `- [${t.name}](${u(`/tours/${t.slug}`)}): ${t.days} days from ${t.origin}.`),
    "",
    "## Destinations",
    ...destinations.map((d) => `- [${d.name}](${u(`/destinations/${d.slug}`)}): ${d.tagline}.`),
    "",
    "## Day trips",
    ...dayTrips.map((d) => `- [${d.name}](${u(`/day-trips/${d.slug}`)})`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
