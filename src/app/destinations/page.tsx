import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SectionHeader from "@/components/SectionHeader";
import { Star, StarDivider } from "@/components/Ornament";
import { breadcrumb, listSchema } from "@/lib/schema";
import { destinationContent, destinations } from "@/lib/destinations";
import { origins, tours } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Morocco Destinations We Cover",
  description: "Explore the places on our private Morocco tours: Marrakech, Fes, Casablanca, the Sahara at Merzouga, Ouarzazate, Essaouira, the Atlas Mountains and Chefchaouen.",
  alternates: { canonical: "/destinations" },
};

// Display order and tile shape on large screens: the Sahara leads, one wide tile closes the grid.
const LAYOUT: { slug: string; cls: string }[] = [
  { slug: "merzouga-sahara", cls: "lg:col-span-2 lg:row-span-2" },
  { slug: "marrakech", cls: "" },
  { slug: "fes", cls: "" },
  { slug: "ouarzazate-ait-ben-haddou", cls: "" },
  { slug: "essaouira", cls: "" },
  { slug: "chefchaouen", cls: "lg:col-span-2" },
  { slug: "casablanca", cls: "" },
  { slug: "atlas-mountains", cls: "" },
];

export default function DestinationsPage() {
  const ordered = LAYOUT.map((l) => ({ ...l, d: destinations.find((d) => d.slug === l.slug) })).filter((x): x is typeof x & { d: NonNullable<typeof x.d> } => !!x.d);
  const stats = [
    { k: String(destinations.length), v: "destinations woven into our routes" },
    { k: String(tours.length), v: "private tours that visit them" },
    { k: String(origins.length), v: `starting cities: ${origins.join(", ")}` },
    { k: SITE.experience.replace(" ", " "), v: "of local knowledge behind every stop" },
  ];

  return (
    <>
      <JsonLd data={[breadcrumb([{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }]), listSchema("Morocco destinations", "/destinations", "Places on our private Morocco tours.", destinations.map((d) => ({ name: d.name, path: `/destinations/${d.slug}`, image: d.hero })))]} />

      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/2017-12-atlas-private-tours-60.jpg" alt="" fill preload fetchPriority="high" quality={60} sizes="100vw" className="-z-10 object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/40 to-night/60" />
        <div className="container-x reveal pb-14 pt-40 md:pb-20 md:pt-52">
          <p className="eyebrow mb-5 flex items-center gap-3"><Star className="h-3 w-3" />Destinations</p>
          <h1 className="display max-w-4xl text-balance text-5xl md:text-7xl">Where we <span className="text-[#e0a060]">take you</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">From imperial cities to the dunes of the Sahara, these are the places woven into our private journeys.</p>
        </div>
      </section>

      <section aria-label="Destinations at a glance" className="zellige bg-night text-sand">
        <dl className="container-x grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v} className="border-l border-gold/40 pl-5">
              <dt className="display text-4xl text-gold md:text-5xl">{s.k}</dt>
              <dd className="mt-1 text-sm leading-snug text-sand/70">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-x py-16 md:py-24">
        <SectionHeader eyebrow="Explore Morocco" intro="Open a destination to see what to see there, the tours that stop in it and our travel guides.">
          Eight places, <span className="accent">one country</span>
        </SectionHeader>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:auto-rows-[19rem] lg:grid-cols-4">
          {ordered.map(({ d, cls }, i) => {
            const n = destinationContent(d).tours.length;
            const big = i === 0;
            return (
              <Link key={d.slug} href={`/destinations/${d.slug}`} className={`group relative isolate block min-h-[20rem] overflow-hidden bg-night text-white ${cls}`}>
                <Image
                  src={d.hero}
                  alt={d.heroAlt}
                  fill
                  quality={60}
                  sizes={cls.includes("col-span-2") ? "(min-width:1024px) 50vw, (min-width:640px) 50vw, 100vw" : "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"}
                  className="-z-10 object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/95 via-night/55 to-night/5 transition-colors group-hover:via-night/65" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <p className="eyebrow !text-sand/80">{d.region}</p>
                  <h2 className={`display mt-2 ${big ? "text-4xl md:text-6xl" : "text-3xl"}`}>{d.name}</h2>
                  <p className={`mt-2 text-white/80 ${big ? "max-w-md text-base" : "text-sm"}`}>{d.tagline}</p>
                  <p className="mt-4 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[.16em]">
                    <span className="text-gold">{n > 0 ? <>{n} tour{n > 1 ? "s" : ""}<span className={cls ? "" : "lg:hidden"}> visit here</span></> : "Day trips and guides"}</span>
                    <span className="border-b border-sand/60 pb-0.5 text-sand transition-colors group-hover:border-gold group-hover:text-gold">Explore</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/2017-12-atlas-private-tours-62.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/70 via-night/40 to-night/80" />
        <div className="container-x flex min-h-[26rem] flex-col items-center justify-center py-20 text-center">
          <StarDivider className="mb-7" />
          <h2 className="display max-w-3xl text-balance text-4xl md:text-6xl">Not sure where to <span className="text-[#e0a060]">begin?</span></h2>
          <p className="mt-5 max-w-xl text-white/80">Tell us how long you have and what you love, and we will suggest a private route that links the right places.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/tours" className="btn btn-primary">Browse our tours</Link>
            <Link href="/contact" className="btn btn-ghost">Design my journey</Link>
          </div>
        </div>
      </section>
    </>
  );
}
