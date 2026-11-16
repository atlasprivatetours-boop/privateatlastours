import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TourFinder from "@/components/TourFinder";
import JsonLd from "@/components/JsonLd";
import { Star, StarDivider } from "@/components/Ornament";
import { breadcrumb, listSchema } from "@/lib/schema";
import { origins, tourSummaries, tours, joinCities } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private Morocco Tours & Itineraries",
  description: `Browse private Morocco tours from 2 to 10 days: Sahara journeys, imperial cities and Atlas crossings from ${joinCities(origins)}.`,
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  const min = Math.min(...tours.map((t) => t.days));
  const max = Math.max(...tours.map((t) => t.days));
  const stats = [
    { k: String(tours.length), v: "private tours to choose from" },
    { k: `${min}–${max}`, v: "days, from a short escape to a grand tour" },
    { k: String(origins.length), v: `starting cities: ${origins.join(", ")}` },
    { k: "100%", v: "adjustable to your dates, pace and interests" },
  ];

  return (
    <>
      <JsonLd data={[breadcrumb([{ name: "Home", path: "/" }, { name: "Tours", path: "/tours" }]), listSchema("Private Morocco tours", "/tours", `Private Morocco tours from 2 to 10 days from ${joinCities(origins)}.`, tours.map((t) => ({ name: t.name, path: `/tours/${t.slug}`, image: t.hero })))]} />

      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/2017-12-atlas-private-tours-79.jpg" alt="Ait Ben Haddou kasbah on the road to the Sahara" fill preload fetchPriority="high" quality={60} sizes="100vw" className="-z-10 object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/40 to-night/60" />
        <div className="container-x reveal pb-14 pt-40 md:pb-20 md:pt-52">
          <p className="eyebrow mb-5 flex items-center gap-3"><Star className="h-3 w-3" />Private tours</p>
          <h1 className="display max-w-4xl text-balance text-5xl md:text-7xl">Morocco tours, designed <span className="text-[#e0a060]">around you</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Every journey is private and can be adjusted to your dates, pace and interests. Choose your starting city, length and style, then tell us what you would like to change.</p>
        </div>
      </section>

      <section aria-label="The tours at a glance" className="zellige bg-night text-sand">
        <dl className="container-x grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v} className="border-l border-gold/40 pl-5">
              <dt className="display text-4xl text-gold md:text-5xl">{s.k}</dt>
              <dd className="mt-1 text-sm leading-snug text-sand/70">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="container-x py-16 md:py-24">
        <TourFinder tours={tourSummaries} />
      </div>

      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/2017-12-atlas-private-tours-62.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/70 via-night/40 to-night/80" />
        <div className="container-x flex min-h-[26rem] flex-col items-center justify-center py-20 text-center">
          <StarDivider className="mb-7" />
          <h2 className="display max-w-3xl text-balance text-4xl md:text-6xl">Every journey can be <span className="text-[#e0a060]">reshaped</span></h2>
          <p className="mt-5 max-w-xl text-white/80">How many of you are travelling, and for how many days? Share your plans and we will tailor a private itinerary.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-primary">Design my journey</Link>
            <a href={SITE.whatsapp} className="btn btn-ghost">WhatsApp us</a>
          </div>
        </div>
      </section>
    </>
  );
}
