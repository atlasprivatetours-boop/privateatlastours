import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { dayTrips, getTrip, tourImageFallback, tripImage } from "@/lib/content";

export const alt = "Private day trip in Morocco";
export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const generateStaticParams = () => dayTrips.map((d) => ({ slug: d.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getTrip(slug);
  if (!d) return ogImage({ title: "Private day trips", image: tourImageFallback });
  return ogImage({ title: `${d.name} day trip`, eyebrow: "Private · 1 day", image: tripImage[d.slug] ?? tourImageFallback });
}
