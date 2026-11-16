import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumb } from "@/lib/schema";
import { cityPath, getPost, origins, posts, tourImageFallback, excerpt } from "@/lib/content";
import { shortTitle } from "@/lib/seo";

export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: shortTitle(p.title),
    description: excerpt(p.description, 155),
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", publishedTime: p.date, modifiedTime: p.modified },
  };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const p = getPost(slug);
  if (!p) notFound();
  const date = new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <JsonLd data={[articleSchema(p), breadcrumb([{ name: "Home", path: "/" }, { name: "Journal", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }])]} />
      <PageHero title={p.title} image={p.image ?? tourImageFallback}>
        <Breadcrumbs items={[{ name: "Journal", href: "/blog" }, { name: "Article" }]} />
        <p className="eyebrow mb-4">{date}</p>
      </PageHero>
      <article className="container-x prose-atlas mx-auto max-w-3xl py-16">
        {p.blocks.map((b, i) => (b.t === "h" ? <h2 key={i}>{b.x}</h2> : <p key={i}>{b.x}</p>))}
        <div className="mt-16 border-t border-ink/15 pt-10">
          <p className="display text-3xl">Ready to see it for yourself?</p>
          <p className="mt-2">Tell us your dates and interests and we will design a private journey around them.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link href="/tours" className="btn btn-dark">Browse tours</Link><Link href="/contact" className="btn btn-primary">Plan my trip</Link></div>
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {origins.map((o) => <Link key={o} href={cityPath(o)} className="underline decoration-gold underline-offset-4 hover:text-terracotta">Tours from {o}</Link>)}
          </p>
        </div>
      </article>
    </>
  );
}
