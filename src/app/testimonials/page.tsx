import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { testimonials } from "@/lib/content";
import { tripInfo, tripLinkFor } from "@/lib/reviews";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Guest Stories & Tripadvisor Reviews",
  description: "Read verified guest reviews of Atlas Private Tours, originally posted on Tripadvisor: desert trips, imperial cities and day trips across Morocco.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd data={[breadcrumb([{ name: "Home", path: "/" }, { name: "Guest stories", path: "/testimonials" }]), pageSchema("WebPage", "Guest stories and Tripadvisor reviews", "/testimonials", "Reviews of Atlas Private Tours originally posted by travellers on Tripadvisor.")]} />
      <PageHero eyebrow="Guest stories" title="In our guests’ words" intro="Reviews originally posted by travellers on Tripadvisor." image="/images/2017-12-atlas-private-tours-35.jpg" />
      <div className="container-x mx-auto max-w-4xl divide-y divide-ink/15 py-16">
        {testimonials.map((t) => {
          const info = tripInfo(t.author);
          const link = tripLinkFor(t.author);
          return (
            <figure key={t.author} className="py-10">
              <figcaption className="mb-4">
                {info && <p className="mb-2 text-xs font-semibold uppercase tracking-[.16em] text-clay">{info.match === "exact" ? "Travelled:" : "A similar journey:"} {info.trip}</p>}
                <p className="display text-2xl">{t.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[.18em] text-muted">{t.author} · Posted on Tripadvisor</p>
              </figcaption>
              <blockquote className="leading-relaxed text-ink/85">{t.text}</blockquote>
              {link && <Link href={link.href} className="mt-5 inline-block border-b border-clay pb-0.5 text-xs font-semibold uppercase tracking-[.18em] text-clay">{link.label}</Link>}
            </figure>
          );
        })}
        <p className="pt-10 text-center">
          <a href={SITE.tripadvisor} rel="noopener" target="_blank" className="btn btn-dark">Read all reviews on Tripadvisor</a>
        </p>
      </div>
    </>
  );
}
