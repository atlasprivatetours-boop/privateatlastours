import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { destinations, getDestination } from "@/lib/destinations";

export const alt = "Morocco destination";
export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const generateStaticParams = () => destinations.map((d) => ({ slug: d.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return ogImage({ title: "Morocco destinations", image: "/images/2017-12-atlas-private-tours-60.jpg" });
  return ogImage({ title: d.name, eyebrow: d.region, meta: d.tagline, image: d.hero });
}
