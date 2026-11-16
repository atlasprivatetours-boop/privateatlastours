import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import TourCard from "@/components/TourCard";
import RouteMap from "@/components/RouteMap";
import TourReviews from "@/components/TourReviews";
import { Star } from "@/components/Ornament";
import { generalReviews, reviewsForTour } from "@/lib/reviews";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, faqSchema, tourSchema } from "@/lib/schema";
import { tourRoute } from "@/lib/route";
import { excerpt, getTour, styleLabels, tourLabel, tours } from "@/lib/content";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(props: PageProps<"/tours/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const t = getTour(slug);
  if (!t) return {};
  const desc = t.seoDescription || excerpt(t.overview[0] || t.itinerary[0]?.text || t.name, 155);
  return {
    title: t.seoTitle || t.name,
    description: desc,
    alternates: { canonical: `/tours/${t.slug}` },
    openGraph: { type: "article", title: t.name, description: desc },
  };
}

export default async function TourPage(props: PageProps<"/tours/[slug]">) {
  const { slug } = await props.params;
  const t = getTour(slug);
  if (!t) notFound();
  const related = tours.filter((x) => x.slug !== t.slug && x.origin === t.origin).slice(0, 3);
  const gallery = t.images.filter((u) => u !== t.hero).slice(0, 8);
  const intro = t.overview[0] || t.itinerary[0]?.text;
  const matched = reviewsForTour(t.slug);

  const styles = styleLabels(t);
  const route = tourRoute(t);
  const stay = new Map<number, string>();
  route?.stops.forEach((st) => st.days.forEach((d) => stay.set(d, st.name)));
  const ends = route?.end;
  const facts = [
    { k: "Duration", v: tourLabel(t) },
    { k: "Starts in", v: t.origin },
    ...(ends ? [{ k: "Ends in", v: ends }] : []),
    { k: "Style", v: styles.length ? styles.join(" · ") : "Private journey" },
  ];
  const nav: [string, string][] = [
    ["overview", "Overview"],
    ["route", "Route"],
    ["itin", "Day by day"],
    ["included", "Included"],
    ...(gallery.length ? ([["photos", "Photos"]] as [string, string][]) : []),
  ];

  return (
    <>
      <JsonLd data={[tourSchema(t), breadcrumb([{ name: "Home", path: "/" }, { name: "Tours", path: "/tours" }, { name: t.name, path: `/tours/${t.slug}` }]), ...(t.faqs.length ? [faqSchema(t.faqs)] : [])]} />

      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src={t.hero} alt={t.name} fill preload fetchPriority="high" quality={60} sizes="100vw" className="-z-10 object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/40 to-night/60" />
        <div className="container-x reveal pb-12 pt-36 md:pb-16 md:pt-48">
          <Breadcrumbs items={[{ name: "Tours", href: "/tours" }, { name: t.name }]} />
          <p className="eyebrow mb-4 flex items-center gap-3"><Star className="h-3 w-3" />Private tour from {t.origin}</p>
          <h1 className="display max-w-4xl text-balance text-4xl sm:text-5xl md:text-6xl">{t.name}</h1>
        </div>
        <div className="relative border-t border-white/15 bg-night/60 backdrop-blur-sm">
          <dl className="container-x grid grid-cols-2 gap-y-5 py-6 md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.k} className="border-l border-gold/40 pl-4">
                <dt className="text-[.65rem] font-semibold uppercase tracking-[.2em] text-gold">{f.k}</dt>
                <dd className="mt-1 text-sm leading-snug text-sand md:text-base">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <nav aria-label="On this page" className="sticky top-20 z-30 border-b border-ink/10 bg-sand/95 backdrop-blur">
        <ul className="container-x flex gap-7 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {nav.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="block py-4 text-xs font-semibold uppercase tracking-[.18em] text-ink/70 hover:text-clay">{label}</a></li>
          ))}
        </ul>
      </nav>

      <div className="container-x grid gap-14 pb-28 pt-14 lg:grid-cols-[1fr_22rem] lg:pb-24 lg:pt-20">
        <article className="min-w-0">
          <section id="overview" className="scroll-mt-40">
            {intro && <p className="display text-2xl leading-snug md:text-3xl">{intro}</p>}
            {t.overview.slice(1).map((p, i) => <p key={i} className="mt-5 leading-relaxed text-ink/80">{p}</p>)}
          </section>

          {t.highlights.length > 0 && (
            <section className="mt-14" aria-labelledby="hl">
              <h2 id="hl" className="display text-3xl md:text-4xl">Highlights</h2>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {t.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 border-t border-ink/10 pt-3 text-[.97rem] leading-snug"><span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />{h}</li>
                ))}
              </ul>
            </section>
          )}

          <section id="route" className="mt-16 scroll-mt-40" aria-labelledby="route-h">
            <h2 id="route-h" className="display mb-6 text-3xl md:text-4xl">The route</h2>
            <RouteMap tour={t} />
          </section>

          <section id="itin" className="mt-16 scroll-mt-40" aria-labelledby="itin-h">
            <h2 id="itin-h" className="display text-3xl md:text-4xl">Day by day</h2>
            <ol className="relative mt-10 space-y-10 before:absolute before:bottom-2 before:left-[1.35rem] before:top-2 before:w-px before:bg-gradient-to-b before:from-gold before:to-gold/20 md:before:left-[1.6rem]">
              {t.itinerary.map((d) => {
                const endDay = d.dayEnd ?? d.day;
                const place = stay.get(endDay);
                const last = endDay >= t.days;
                return (
                  <li key={d.day} className="relative grid grid-cols-[2.75rem_1fr] gap-5 md:grid-cols-[3.25rem_1fr] md:gap-7">
                    <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-gold bg-night text-gold md:h-[3.25rem] md:w-[3.25rem]">
                      <span className="display text-xl leading-none md:text-2xl">{d.day}</span>
                    </span>
                    <div className="pt-1">
                      <p className="text-[.65rem] font-semibold uppercase tracking-[.2em] text-clay">Day {d.day}{d.dayEnd ? `–${d.dayEnd}` : ""}</p>
                      <h3 className="display mt-1 text-2xl leading-tight md:text-[1.7rem]">{d.title}</h3>
                      {d.text.split("\n").map((p, i) => <p key={i} className="mt-3 leading-relaxed text-ink/80">{p}</p>)}
                      {place && (
                        <p className="mt-4 inline-flex items-center gap-2 border border-ink/15 px-3 py-1.5 text-xs uppercase tracking-[.14em] text-muted">
                          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                          {last ? `Journey ends in ${place}` : `Overnight in ${place}`}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {(t.includes.length > 0 || t.excludes.length > 0) && (
            <section id="included" className="mt-20 grid scroll-mt-40 gap-6 md:grid-cols-2" aria-label="What is included">
              {t.includes.length > 0 && (
                <div className="border border-ink/15 bg-white/50 p-7"><h2 className="display text-3xl">Included</h2><ul className="mt-5 space-y-3 text-sm leading-relaxed">{t.includes.map((x, i) => <li key={i} className="flex gap-3"><span className="text-clay" aria-hidden>✓</span>{x}</li>)}</ul></div>
              )}
              {t.excludes.length > 0 && (
                <div className="border border-ink/15 p-7"><h2 className="display text-3xl">Not included</h2><ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink/75">{t.excludes.map((x, i) => <li key={i} className="flex gap-3"><span aria-hidden>–</span>{x}</li>)}</ul></div>
              )}
            </section>
          )}

          {t.faqs.length > 0 && (
            <section className="mt-16" aria-labelledby="faq">
              <h2 id="faq" className="display text-3xl md:text-4xl">Questions</h2>
              <div className="mt-6 divide-y divide-ink/15 border-y border-ink/15">
                {t.faqs.map((f, i) => (
                  <details key={i} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">{f.q}<span className="text-clay transition-transform group-open:rotate-45" aria-hidden>+</span></summary><p className="mt-3 leading-relaxed text-ink/75">{f.a}</p></details>
                ))}
              </div>
            </section>
          )}

          {gallery.length > 0 && (
            <section id="photos" className="mt-20 scroll-mt-40" aria-label="Photo gallery">
              <h2 className="display text-3xl md:text-4xl">On the road</h2>
              <div className="mt-6 grid auto-rows-[10rem] grid-cols-2 gap-3 md:auto-rows-[12rem] md:grid-cols-3">
                {gallery.slice(0, 6).map((u, i) => (
                  <div key={u} className={`relative overflow-hidden bg-sand-2 ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                    <Image src={u} alt={`${t.name} photograph`} fill sizes={i === 0 ? "(min-width:1024px) 45vw, 100vw" : "(min-width:768px) 20vw, 50vw"} className="object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="lg:sticky lg:top-40 lg:self-start">
          <div className="zellige bg-night p-7 text-sand">
            <p className="eyebrow mb-2 flex items-center gap-2"><Star className="h-2.5 w-2.5" />Private tour</p>
            <p className="display text-3xl">Enquire about this journey</p>
            <ul className="mt-4 space-y-2 text-sm text-sand/80">
              <li className="flex gap-2"><span className="text-gold" aria-hidden>✓</span>Private driver and licensed guides</li>
              <li className="flex gap-2"><span className="text-gold" aria-hidden>✓</span>Adjustable to your dates and pace</li>
              <li className="flex gap-2"><span className="text-gold" aria-hidden>✓</span>Personal quote for your group</li>
            </ul>
            <p className="mt-4 text-sm text-sand/60">Prices depend on group size, season and accommodation.</p>
            <a href="#enquire-tour" className="btn btn-primary mt-6 w-full">Request a quote</a>
            <a href={SITE.whatsapp} className="btn btn-ghost mt-3 w-full">WhatsApp us</a>
            <p className="mt-5 text-center text-xs text-sand/50">{SITE.phone}</p>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-night/95 py-3 pl-4 pr-24 backdrop-blur lg:hidden">
        <a href="#enquire-tour" className="btn btn-primary w-full">Request a quote</a>
      </div>

      {matched.length > 0 ? (
        <TourReviews heading={matched.some((r) => r.match === "exact") ? "What guests say about this tour" : "Guests on similar journeys"} reviews={matched} />
      ) : (
        <TourReviews heading="What guests say" intro="Reviews from guests who travelled with us on other journeys, posted on Tripadvisor." reviews={generalReviews(2)} />
      )}

      <section id="enquire-tour" className="bg-night text-sand">
        <div className="container-x grid gap-12 py-20 md:grid-cols-[1fr_1.3fr]">
          <div><p className="eyebrow mb-3">Book this tour</p><h2 className="display text-4xl md:text-5xl">Make it yours</h2><p className="mt-5 text-sand/70">Different dates, a longer stay, an extra night in the desert? Every tour can be customised.</p></div>
          <EnquiryForm dark subject={t.name} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x py-20">
          <h2 className="display mb-8 text-4xl">More tours from {t.origin}</h2>
          <div className="grid gap-6 md:grid-cols-3">{related.map((r) => <TourCard key={r.slug} tour={r} tags={styleLabels(r)} />)}</div>
          <Link href="/tours" className="btn btn-dark mt-10">All tours</Link>
        </section>
      )}
    </>
  );
}
