import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { getTour, tourLabel, tours } from "@/lib/content";

export const alt = "Private Morocco tour";
export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const generateStaticParams = () => tours.map((t) => ({ slug: t.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTour(slug);
  if (!t) return ogImage({ title: "Private tours in Morocco", image: "/images/2017-12-atlas-private-tours-13.jpeg" });
  return ogImage({ title: t.name, eyebrow: `From ${t.origin}`, meta: `${tourLabel(t)} · Private tour`, image: t.hero });
}
