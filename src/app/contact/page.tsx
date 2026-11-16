import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import PlanForm from "@/components/PlanForm";
import JsonLd from "@/components/JsonLd";
import { Star } from "@/components/Ornament";
import { origins, tours } from "@/lib/content";
import { SITE } from "@/lib/site";
import { breadcrumb, pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact & Plan Your Morocco Tour",
  description: "Contact Atlas Private Tours by WhatsApp, phone or email. Tell us how many people are travelling and for how many days, and we will design your private Morocco tour.",
  alternates: { canonical: "/contact" },
};

const steps = [
  { n: "01", t: "Tell us your plans", d: "How many of you are travelling, how long you would like and roughly when. A short message is enough." },
  { n: "02", t: "We tailor the route", d: "Start from one of our itineraries or a blank page. Pace, stops and accommodation style can all be adapted." },
  { n: "03", t: "Travel privately", d: "Your own driver-guide and vehicle for the whole journey, with our team available seven days a week." },
];

export default function ContactPage() {
  const options = tours.map((t) => ({ slug: t.slug, name: t.name })).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  return (
    <>
      <JsonLd data={[breadcrumb([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]), pageSchema("ContactPage", "Contact and plan your Morocco tour", "/contact", "Contact Atlas Private Tours by WhatsApp, phone or email and plan a private Morocco tour.")]} />
      <PageHero eyebrow="Plan your journey" title="Let’s plan your Morocco" intro="How many people will be travelling with you? How many days would you like to spend with us? Share your plans and we will take care of the rest." image="/images/2017-12-atlas-private-tours-52.jpg" />

      <section aria-label="How it works" className="zellige bg-night text-sand">
        <ol className="container-x grid gap-8 py-10 md:grid-cols-3 md:gap-0">
          {steps.map((s) => (
            <li key={s.n} className="border-gold/40 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0">
              <p className="display text-4xl text-gold">{s.n}</p>
              <p className="mt-1 font-semibold">{s.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-sand/70">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="eyebrow mb-4 flex items-center gap-3"><Star className="h-3 w-3" />Your enquiry</p>
          <h2 className="display mb-8 max-w-xl text-4xl md:text-5xl">Tell us about your <span className="accent">journey</span></h2>
          <PlanForm tours={options} whatsapp={SITE.whatsapp} cities={[...origins]} />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="relative isolate overflow-hidden bg-night p-8 text-sand">
            <Image src="/images/2017-12-atlas-private-tours-62.jpg" alt="" fill sizes="(min-width:1024px) 30vw, 100vw" quality={60} className="-z-10 object-cover opacity-25" />
            <p className="eyebrow mb-3">Prefer to talk?</p>
            <a className="display block text-3xl text-white hover:text-gold" href={SITE.phoneHref}>{SITE.phone}</a>
            <p className="mt-3 text-sm text-sand/75">Our support team is available seven days a week.</p>
            <a href={SITE.whatsapp} className="btn btn-primary mt-6 w-full">Chat on WhatsApp</a>
          </div>

          <div className="border border-ink/10 bg-white/50 p-8">
            <p className="eyebrow mb-2">Email</p>
            <a className="break-all text-lg hover:text-clay" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <p className="eyebrow mb-2 mt-7">Based in</p>
            <p>Fes, Morocco. A local Berber family with over 15 years of showing guests their country.</p>
            <p className="eyebrow mb-2 mt-7">Follow and read reviews</p>
            <p className="flex flex-wrap gap-x-5 gap-y-1">
              <a className="border-b border-clay pb-0.5 hover:text-clay" href={SITE.facebook} target="_blank" rel="noopener">Facebook</a>
              <a className="border-b border-clay pb-0.5 hover:text-clay" href={SITE.tripadvisor} target="_blank" rel="noopener">Tripadvisor</a>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
