import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/lib/content";

type CardTour = Pick<Tour, "slug" | "name" | "origin" | "days" | "nights" | "hero">;

export default function TourCard({ tour, tags }: { tour: CardTour; tags?: string[] }) {
  return (
    <Link href={`/tours/${tour.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand-2">
        <Image
          src={tour.hero}
          alt={`${tour.name}, a private tour in Morocco`}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-night/30" />
        <div className="absolute left-5 top-5 bg-sand/95 px-3.5 py-2 text-ink backdrop-blur-sm">
          <span className="display text-3xl leading-none">{tour.days}</span>
          <span className="ml-1.5 text-[.65rem] font-semibold uppercase tracking-[.2em]">days</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="eyebrow !text-sand/85">From {tour.origin}{tour.nights ? ` · ${tour.nights} nights` : ""}</p>
          <h3 className="display mt-2 text-[1.7rem] leading-tight">{tour.name}</h3>
          {tags && tags.length > 0 && (
            <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[.7rem] uppercase tracking-[.14em] text-sand/70">
              {tags.map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span aria-hidden className="h-1 w-1 rotate-45 bg-gold" />
                  {t}
                </span>
              ))}
            </p>
          )}
          <span className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[.18em]">
            View itinerary
            <span aria-hidden className="inline-block h-px w-6 bg-gold transition-all duration-500 group-hover:w-12" />
          </span>
        </div>
      </div>
    </Link>
  );
}
