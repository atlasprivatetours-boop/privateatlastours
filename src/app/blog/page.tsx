import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { excerpt, posts } from "@/lib/content";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, listSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Morocco Travel Journal & Guides",
  description: "Practical Morocco travel guides: the best time to visit, Sahara desert trips, Fes and Marrakech, food, souks, beaches and safety tips from local experts.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [first, ...rest] = posts;
  return (
    <>
      <JsonLd data={[breadcrumb([{ name: "Home", path: "/" }, { name: "Journal", path: "/blog" }]), listSchema("Morocco travel journal and guides", "/blog", "Practical Morocco travel guides from local experts.", posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}`, ...(p.image ? { image: p.image } : {}) })))]} />
      <PageHero eyebrow="The journal" title="Travel notes on Morocco" intro="Guides, ideas and practical advice from people who live here." image="/images/2017-12-atlas-private-tours-84.jpg" />
      <div className="container-x py-16">
        <Link href={`/blog/${first.slug}`} className="group grid gap-8 md:grid-cols-2">
          {first.image && <div className="relative aspect-[3/2] overflow-hidden bg-sand-2"><Image src={first.image} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" /></div>}
          <div className="self-center"><p className="eyebrow mb-3">Latest</p><h2 className="display text-4xl group-hover:text-clay md:text-5xl">{first.title}</h2><p className="mt-4 text-ink/75">{excerpt(first.description, 200)}</p></div>
        </Link>
        <div className="mt-20 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
              {p.image && <div className="relative aspect-[3/2] overflow-hidden bg-sand-2"><Image src={p.image} alt="" fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" /></div>}
              <h2 className="display mt-4 text-2xl leading-tight group-hover:text-clay">{p.title}</h2>
              <p className="mt-2 text-sm text-muted">{excerpt(p.description, 130)}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
