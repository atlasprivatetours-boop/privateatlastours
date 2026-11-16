import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { dayTrips, excerpt, tourImageFallback, tripImage } from "@/lib/content";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, listSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Private Day Trips in Morocco",
  description: "Private day trips with local guides: Volubilis and Meknes, Essaouira, Ouzoud Waterfalls, Ourika Valley, the Atlas Mountains and the Sahara.",
  alternates: { canonical: "/day-trips" },
};

export default function DayTripsPage() {
  return (
    <>
      <JsonLd data={[breadcrumb([{ name: "Home", path: "/" }, { name: "Day trips", path: "/day-trips" }]), listSchema("Private day trips in Morocco", "/day-trips", "Private day trips with local guides across Morocco.", dayTrips.map((d) => ({ name: d.name, path: `/day-trips/${d.slug}`, image: tripImage[d.slug] })))]} />
      <PageHero eyebrow="Day trips" title="One day, one remarkable place" intro="Short on time? Add a private day trip to your stay, with a local driver-guide and a pace that suits you." image="/images/2017-12-atlas-private-tours-88.jpg" />
      <div className="container-x grid gap-x-6 gap-y-14 py-20 sm:grid-cols-2 lg:grid-cols-3">
        {dayTrips.map((d) => (
          <Link key={d.slug} href={`/day-trips/${d.slug}`} className="group">
            <div className="relative aspect-[3/2] overflow-hidden bg-sand-2">
              <Image src={tripImage[d.slug] ?? tourImageFallback} alt={`${d.name} day trip`} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <p className="eyebrow mt-5">1 day</p>
            <h2 className="display mt-1 text-3xl">{d.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{excerpt(d.text, 150)}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
