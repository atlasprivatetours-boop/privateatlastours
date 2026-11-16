import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import TourCard from "@/components/TourCard";
import EnquiryForm from "@/components/EnquiryForm";
import HeroSlider, { type HeroSlide } from "@/components/HeroSlider";
import CardStrip from "@/components/CardStrip";
import JsonLd from "@/components/JsonLd";
import SectionHeader from "@/components/SectionHeader";
import { Star, StarDivider } from "@/components/Ornament";
import { faqSchema, pageSchema } from "@/lib/schema";
import { destinations } from "@/lib/destinations";
import { dayTrips, excerpt, posts, testimonials, tourImageFallback, tours, tripBlurb, tripImage, joinCities, origins } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Private Morocco Tours: Sahara, Imperial Cities & Day Trips" },
  description: `Private Morocco tours by a local Berber family: Sahara journeys, imperial cities and day trips from ${joinCities(origins)}.`,
};

const facts = [
  { k: "15+", v: "years showing guests Morocco" },
  { k: "Berber", v: "family, grown up in the Sahara" },
  { k: "Private", v: "your own driver-guide and vehicle" },
  { k: "7 days", v: "a week of support from our team" },
];

const pillars = [
  { t: "Born in the Sahara", d: "Our owner, guides and drivers grew up in the desert and know the routes, families and places that never make the brochures." },
  { t: "Truly private", d: "Your own licensed driver-guide and air-conditioned vehicle. Your pace, your stops, your itinerary." },
  { t: "Licensed and registered", d: "Each driver and vehicle is registered and carries the permits required to work with tourists in Morocco." },
  { t: "Tailor-made", d: "Every tour here can be reshaped around your dates, interests and travel style. Just tell us what matters." },
];

const steps = [
  { n: "01", t: "Tell us your plans", d: "How many of you are travelling, how many days you would like, and roughly when. A message or a WhatsApp is enough." },
  { n: "02", t: "We tailor the route", d: "Start from one of our itineraries or from a blank page. Pace, stops and accommodation style can all be adapted." },
  { n: "03", t: "Travel privately", d: "Your own driver-guide and vehicle for the whole journey, with our support team available seven days a week." },
];

// Answers taken from the existing tour pages on atlasprivatetours.com.
const faqs = [
  { q: "How long is the camel ride in Merzouga?", a: "Usually between 1 and 1.5 hours each way, depending on your camp’s location in the dunes. Travellers who prefer not to ride camels can request a 4x4 transfer to the camp." },
  { q: "Is a tour suitable for families or older travellers?", a: "Yes. Because the tour is private it is flexible: the pace can be adjusted, and camel rides or long walks can be replaced with 4x4 transport if needed." },
  { q: "Can I change the itinerary?", a: "Absolutely. Since it is a private trip, the itinerary, pace and even the accommodation style can be adapted to your preferences." },
  { q: "What is the best time of year to travel?", a: "Spring (March to May) and autumn (September to November) offer the most pleasant weather. Summer can be very hot in the desert, while winter nights can be cold." },
  { q: "How much driving is there each day?", a: "On a typical multi-day tour you spend around 4 to 6 hours on the road daily, with scenic and cultural stops along the way to break up the journey." },
  { q: "Can dietary needs be accommodated?", a: "Yes. Most riads and camps can prepare vegetarian, vegan or other special meals with prior notice." },
];

const heroSlides: HeroSlide[] = [
  { src: "/images/2017-12-atlas-private-tours-13.jpeg", alt: "Camel caravan casting long shadows across the Erg Chebbi dunes at sunset", place: "Erg Chebbi, Sahara", href: "/destinations/merzouga-sahara" },
  { src: "/images/2017-12-marrakech-slide.jpg", alt: "The High Atlas mountains rising behind a reflecting pool and garden pavilion in Marrakech", place: "Marrakech", href: "/destinations/marrakech" },
  { src: "/images/2018-06-1x-1.jpg", alt: "The ornate blue tiled gate at the entrance to the old medina of Fes", place: "Fes", href: "/destinations/fes", pos: "50% 60%" },
  { src: "/images/2018-07-545350.jpg", alt: "Blue painted doorways and steps in Chefchaouen", place: "Chefchaouen", href: "/destinations/chefchaouen" },
  { src: "/images/2017-12-high-atlas-bg5.jpg", alt: "A valley in the Atlas Mountains in warm evening light", place: "Atlas Mountains", href: "/destinations/atlas-mountains" },
];

const reviewAuthors = ["DLOttawa", "Basya", "Larisa C"];

export default function Home() {
  const featured = [
    tours.find((t) => t.slug === "3-days-from-marrakech-to-desert-merzouga"),
    tours.find((t) => t.slug === "7-day-tour-from-casablanca-to-marrakech"),
    tours.find((t) => t.slug === "10-days-tours-from-marrakech-imperial-cities"),
  ].filter((t): t is NonNullable<typeof t> => !!t);
  const reviews = reviewAuthors.map((a) => testimonials.find((t) => t.author === a)).filter((t): t is NonNullable<typeof t> => !!t);
  const [lead, ...others] = reviews;
  const tiles = ["merzouga-sahara", "marrakech", "fes", "ouarzazate-ait-ben-haddou", "essaouira"]
    .map((s) => destinations.find((d) => d.slug === s))
    .filter((d): d is NonNullable<typeof d> => !!d);

  return (
    <>
      <JsonLd data={[pageSchema("WebPage", "Private Morocco Tours | Atlas Private Tours", "/", `Private, tailor-made Morocco tours led by a local Berber family from Fes. Sahara desert journeys, imperial cities and day trips from ${joinCities(origins)}.`), faqSchema(faqs)]} />

      {/* Hero */}
      <HeroSlider slides={heroSlides}>
        <p className="eyebrow mb-5 flex items-center gap-3 !text-sand"><Star className="h-3 w-3 text-gold" />Private tours · Morocco</p>
        <h1 className="display max-w-4xl text-[2.9rem] sm:text-6xl md:text-8xl">Morocco, travelled the way it <span className="text-[#e0a060]">is lived.</span></h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">Private journeys from {joinCities(origins)}, guided by a local Berber family with over 15 years of showing guests their country.</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link href="/tours" className="btn btn-primary">Explore our tours</Link>
          <Link href="/contact" className="btn btn-ghost">Design my journey</Link>
        </div>
      </HeroSlider>

      {/* Facts */}
      <section aria-label="Find a tour" className="zellige bg-night text-sand">
        <dl className="container-x grid grid-cols-2 gap-y-8 py-12 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k} className="border-l border-gold/40 pl-5">
              <dt className="display text-4xl text-gold md:text-5xl">{f.k}</dt>
              <dd className="mt-1 text-sm leading-snug text-sand/70">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Signature tours */}
      <section className="container-x py-24 md:py-32">
        <SectionHeader eyebrow="Signature journeys" intro="From a three-day desert crossing to ten days through the imperial cities. All private, all adjustable." href="/tours" hrefLabel={`All ${tours.length} tours`}>
          Three ways into the <span className="accent">real Morocco</span>
        </SectionHeader>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((t) => <div key={t.slug} className="reveal-on-scroll"><TourCard tour={t} /></div>)}
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-sand-2">
        <div className="container-x py-24 md:py-32">
          <SectionHeader eyebrow="Destinations" href="/destinations" hrefLabel="All destinations">
            From the Atlantic coast to the <span className="accent">dunes</span>
          </SectionHeader>
          <div className="mt-14 grid gap-4 md:auto-rows-[17rem] md:grid-cols-4">
            {tiles.map((d, i) => (
              <Link key={d.slug} href={`/destinations/${d.slug}`} className={`group reveal-on-scroll relative block min-h-64 overflow-hidden bg-night ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <Image src={d.hero} alt={d.heroAlt} fill sizes={i === 0 ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 100vw"} className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/15 to-transparent" />
                <span aria-hidden className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/60 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">→</span>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="eyebrow !text-sand/90">{d.region}</p>
                  <h3 className={`display mt-1 ${i === 0 ? "text-4xl md:text-6xl" : "text-3xl"}`}>{d.name}</h3>
                  {i === 0 && <p className="mt-3 max-w-sm text-white/85">{d.tagline}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statement band */}
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/2017-12-atlas-private-tours-60.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/60 via-night/30 to-night/70" />
        <div className="container-x reveal-on-scroll flex min-h-[30rem] flex-col items-center justify-center py-24 text-center">
          <StarDivider className="mb-8" />
          <p className="display max-w-4xl text-3xl leading-tight md:text-6xl">
            Travellers want to get off the beaten track and <span className="text-[#e0a060]">experience the real Morocco.</span>
          </p>
          <p className="mt-6 max-w-xl text-white/80">So we choose the places to visit, the accommodation and the pace with that in mind, and our drivers are qualified, experienced, bilingual local people.</p>
          <Link href="/about" className="btn btn-ghost mt-9">How we travel</Link>
        </div>
      </section>

      {/* Why Atlas */}
      <section className="zellige bg-night text-sand">
        <div className="container-x grid gap-16 py-24 md:grid-cols-[1fr_1.1fr] md:py-32">
          <div className="reveal-on-scroll relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src="/images/2017-12-atlas-private-tours-85.jpg" alt="Traveller in a blue Berber turban in the desert" fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
            </div>
            <div aria-hidden className="absolute -bottom-4 -right-4 -z-10 h-full w-full border border-gold/50" />
            <p className="absolute bottom-6 left-0 flex items-center gap-3 bg-night/90 py-3 pl-6 pr-8 text-xs uppercase tracking-[.22em] text-sand"><Star className="h-3 w-3 text-gold" />Based in Fes, Morocco</p>
          </div>
          <div className="self-center">
            <SectionHeader eyebrow="Why Atlas">A family business <span className="accent">rooted</span> in the desert</SectionHeader>
            <p className="mt-6 max-w-xl leading-relaxed text-sand/75">Atlas Private Tours is a local Moroccan Berber travel agency in Fes. We grew up in the Sahara and are proud to share our culture, traditions and everything Morocco has to offer.</p>
            <dl className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {pillars.map((p) => (
                <div key={p.t} className="border-t border-gold/30 pt-5">
                  <dt className="display flex items-center gap-3 text-2xl text-gold"><Star className="h-3 w-3 shrink-0" />{p.t}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-sand/70">{p.d}</dd>
                </div>
              ))}
            </dl>
            <Link href="/about" className="btn btn-ghost mt-10 inline-flex">Our story</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-x py-24 md:py-32">
        <SectionHeader eyebrow="How it works" center>
          Your journey, in <span className="accent">three steps</span>
        </SectionHeader>
        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:before:absolute md:before:left-[16%] md:before:right-[16%] md:before:top-8 md:before:border-t md:before:border-dashed md:before:border-clay/50">
          {steps.map((s) => (
            <li key={s.n} className="reveal-on-scroll relative text-center">
              <span className="display relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-clay text-2xl text-sand ring-8 ring-sand">{s.n}</span>
              <h3 className="display mt-6 text-3xl">{s.t}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-ink/75">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn btn-primary">Start planning</Link>
          <a href={SITE.whatsapp} className="btn btn-dark">WhatsApp us</a>
        </div>
      </section>

      {/* Day trips: scrolling strip */}
      <section className="zellige bg-night text-sand">
        <CardStrip
          label="day trips"
          header={
            <>
              <p className="eyebrow mb-4 flex items-center gap-3"><Star className="h-3 w-3" />Day trips</p>
              <h2 className="display max-w-3xl text-4xl md:text-6xl">Private days out, from the Atlas to the <span className="text-[#e0a060]">Atlantic</span></h2>
              <p className="mt-4 max-w-xl text-sand/70">Ideas for a single day, each with a private driver and guide.</p>
            </>
          }
          aside={<Link href="/day-trips" className="hidden border-b border-gold pb-1 text-xs font-semibold uppercase tracking-[.18em] text-gold hover:text-sand sm:block">All day trips</Link>}
        >
          {dayTrips.map((d) => (
            <Link key={d.slug} href={`/day-trips/${d.slug}`} className="group relative isolate block aspect-[3/4] w-[16.5rem] shrink-0 snap-start overflow-hidden bg-night ring-1 ring-sand/15 sm:w-[19rem] lg:w-[21rem]">
              <Image src={tripImage[d.slug] ?? tourImageFallback} alt={`${d.name} day trip`} fill quality={60} sizes="(min-width:1024px) 21rem, (min-width:640px) 19rem, 16.5rem" className="-z-10 object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/55 to-night/5" />
              <span className="absolute left-5 top-5 border border-sand/50 px-3 py-1.5 text-[.65rem] font-semibold uppercase tracking-[.2em] text-sand">1 day</span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="display text-3xl text-white">{d.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sand/80">{tripBlurb[d.slug] ?? excerpt(d.text, 110)}</p>
                <span className="mt-4 inline-block border-b border-sand/50 pb-0.5 text-xs font-semibold uppercase tracking-[.16em] text-sand transition-colors group-hover:border-gold group-hover:text-gold">Explore</span>
              </div>
            </Link>
          ))}
        </CardStrip>
        <p className="container-x -mt-10 pb-16 sm:hidden"><Link href="/day-trips" className="border-b border-gold pb-1 text-xs font-semibold uppercase tracking-[.18em] text-gold">All day trips</Link></p>
      </section>

      {/* Guest stories */}
      {lead && (
        <section className="container-x py-24 md:py-32">
          <SectionHeader eyebrow="Guest stories" href="/testimonials" hrefLabel="Read all reviews">
            In our guests’ <span className="accent">words</span>
          </SectionHeader>
          <div className="mt-14 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <figure className="reveal-on-scroll relative flex flex-col justify-between bg-night p-9 text-sand md:p-12">
              <span aria-hidden className="display pointer-events-none absolute right-6 top-0 select-none text-[7rem] leading-none text-gold/15">”</span>
              <blockquote className="display relative z-10 pr-8 text-2xl leading-snug md:text-[2rem]">{excerpt(lead.text, 330)}</blockquote>
              <figcaption className="mt-8 border-t border-gold/30 pt-5">
                <p className="display text-xl text-gold">{lead.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[.18em] text-sand/60">{lead.author} · Posted on Tripadvisor</p>
              </figcaption>
            </figure>
            <div className="grid gap-6">
              {others.map((r) => (
                <figure key={r.author} className="reveal-on-scroll flex flex-col border border-ink/15 bg-white/40 p-7">
                  <figcaption className="display text-xl leading-tight">{r.title}</figcaption>
                  <blockquote className="mt-3 flex-1 text-[.95rem] leading-relaxed text-ink/80">“{excerpt(r.text, 200)}”</blockquote>
                  <p className="mt-4 text-xs uppercase tracking-[.16em] text-muted">{r.author} · Posted on Tripadvisor</p>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-sand-2">
        <div className="container-x grid gap-12 py-24 md:grid-cols-[1fr_1.6fr] md:py-32">
          <div className="reveal-on-scroll">
            <p className="eyebrow mb-4 flex items-center gap-3"><Star className="h-3 w-3" />Good to know</p>
            <h2 className="display text-4xl md:text-5xl">Questions we are <span className="accent">often asked</span></h2>
            <p className="mt-4 text-muted">Anything else? Message us on WhatsApp and we will answer personally.</p>
            <a href={SITE.whatsapp} className="btn btn-dark mt-6">Ask on WhatsApp</a>
          </div>
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-clay/50 text-xl text-clay transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className="container-x py-24 md:py-32">
        <SectionHeader eyebrow="The journal" href="/blog" hrefLabel="All articles">
          Travel notes on <span className="accent">Morocco</span>
        </SectionHeader>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group reveal-on-scroll">
              {p.image && <div className="relative aspect-[3/2] overflow-hidden bg-sand-2"><Image src={p.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" /></div>}
              <h3 className="display mt-5 text-2xl leading-tight group-hover:text-clay">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{excerpt(p.description, 120)}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-clay">Read <span aria-hidden className="h-px w-6 bg-clay transition-all duration-500 group-hover:w-10" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="relative isolate overflow-hidden bg-night text-sand">
        <Image src="/images/2017-12-atlas-private-tours-11.jpeg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25" />
        <div className="zellige absolute inset-0 -z-10" aria-hidden />
        <div className="container-x grid gap-14 py-24 md:grid-cols-[1fr_1.2fr] md:py-32">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-3"><Star className="h-3 w-3" />Plan your journey</p>
            <h2 className="display text-4xl md:text-6xl">Tell us how you would like to see <span className="accent">Morocco</span></h2>
            <p className="mt-6 max-w-md leading-relaxed text-sand/75">How many of you are travelling, and for how many days? Share what you have in mind and we will reply personally with a tailored proposal.</p>
            <ul className="mt-8 space-y-2 text-sm">
              <li><a className="hover:text-gold" href={SITE.whatsapp}>WhatsApp {SITE.phone}</a></li>
              <li><a className="hover:text-gold" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>
          <EnquiryForm dark />
        </div>
      </section>
    </>
  );
}
