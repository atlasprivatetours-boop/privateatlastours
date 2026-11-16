import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { getPost, posts, tourImageFallback } from "@/lib/content";

export const alt = "Atlas Private Tours journal";
export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return ogImage({ title: "Travel notes on Morocco", image: tourImageFallback });
  return ogImage({ title: p.title, eyebrow: "The journal", image: p.image ?? tourImageFallback });
}
