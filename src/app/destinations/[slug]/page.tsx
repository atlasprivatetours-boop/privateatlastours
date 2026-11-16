import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import TourCard from "@/components/TourCard";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, destinationSchema, faqSchema } from "@/lib/schema";
import { destinationContent, destinations, getDestination } from "@/lib/destinations";
import { excerpt, tourImageFallback, tripImage } from "@/lib/content";
import { SITE } from "@/lib/site";
import { DESTINATION_SEO } from "@/lib/seo";

export const generateStaticParams = () => destinations.map((d) => ({ slug: d.slug }));

export async function generateMetadata(props: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const d = getDestination(slug);
  if (!d) return {};
  const o = DESTINATION_SEO[d.slug];
  return {
    title: o?.title ?? (d.name.length > 20 ? `${d.name} Private Tours` : `${d.name}: Private Tours & Day Trips`),
    description: o?.description ?? d.seoDescription,
    alternates: { canonical: `/destinations/${d.slug}` },
  };
}

export default async function DestinationPage(props: PageProps<"/destinations/[slug]">) {
  const { slug } = await props.params;
  const d = getDestination(slug);
  if (!d) notFound();
  const { tours, trips, posts } = destinationContent(d);
  const others = destinations.filter((x) => x.slug !== d.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumb([{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }, { name: d.name, path: `/destinations/${d.slug}` }]),
          destinationSchema(d),
          ...(d.faqs?.length ? [faqSchema(d.faqs)] : []),
        ]}
      />
      <PageHero title={d.name} intro={d.tagline} image={d.hero} alt={d.heroAlt}>
        <Breadcrumbs items={[{ name: "Destinations", href: "/destinations" }, { name: d.name }]} />
        <p className="eyebrow mb-4">{d.region}</p>
      </PageHero>

      <section className="container-x grid gap-14 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
        <p className="display text-2xl leading-snug md:text-3xl">{d.intro}</p>
        <div>
          <h2 className="eyebrow mb-4">On our itineraries</h2>
          <ul className="space-y-3">
            {d.see.map((s) => (
              <li key={s} className="flex gap-3 border-t border-ink/10 pt-3 text-[.97rem] leading-snug">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {d.faqs && d.faqs.length > 0 && (
        <section className="container-x pb-20" aria-labelledby="quick-answers">
          <h2 id="quick-answers" className="display mb-8 text-4xl md:text-5xl">Quick answers</h2>
          <dl className="grid gap-x-12 gap-y-8 md:grid-cols-3">
            {d.faqs.map((f) => (
              <div key={f.q} className="border-t border-ink/15 pt-5">
                <dt className="display text-2xl leading-snug">{f.q}</dt>
                <dd className="mt-3 leading-relaxed text-ink/80">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {tours.length > 0 && (
        <section className="container-x pb-20">
          <h2 className="display mb-8 text-4xl md:text-5xl">Tours that visit {d.name}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{tours.map((t) => <TourCard key={t.slug} tour={t} />)}</div>
        </section>
      )}

      {trips.length > 0 && (
        <section className="bg-sand-2">
          <div className="container-x py-20">
            <h2 className="display mb-8 text-4xl md:text-5xl">Day trips nearby</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((t) => (
                <Link key={t.slug} href={`/day-trips/${t.slug}`} className="group">
                  <div className="relative aspect-[3/2] overflow-hidden bg-sand">
                    <Image src={tripImage[t.slug] ?? tourImageFallback} alt={`${t.name} day trip`} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <h3 className="display mt-4 text-2xl">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted">{excerpt(t.text, 110)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="container-x py-20">
          <h2 className="display mb-8 text-4xl md:text-5xl">Read before you go</h2>
          <ul className="divide-y divide-ink/15 border-y border-ink/15">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group flex items-center justify-between gap-6 py-5">
                  <span className="display text-2xl leading-tight group-hover:text-clay">{p.title}</span>
                  <span aria-hidden className="text-clay">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-night text-sand">
        <div className="container-x grid gap-12 py-20 md:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow mb-3">Plan your journey</p>
            <h2 className="display text-4xl md:text-5xl">Include {d.name} in your Morocco</h2>
            <p className="mt-5 text-sand/70">Tell us your dates and who is travelling, and we will build a private itinerary around it.</p>
          </div>
          <EnquiryForm dark subject={`${d.name} trip`} />
        </div>
      </section>

      <section className="container-x py-16">
        <p className="eyebrow mb-4">More destinations</p>
        <div className="flex flex-wrap gap-3">
          {others.map((o) => <Link key={o.slug} href={`/destinations/${o.slug}`} className="btn btn-ghost !border-ink/30 !py-2.5 !min-h-0">{o.name}</Link>)}
        </div>
      </section>
    </>
  );
}
