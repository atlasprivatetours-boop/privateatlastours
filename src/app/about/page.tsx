import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Atlas Private Tours",
  description: "Atlas Private Tours is a local Moroccan Berber travel agency in Fes with over 15 years' experience. Meet the family behind private tours across Morocco.",
  alternates: { canonical: "/about" },
};

const offers = [
  { t: "Tailor-made private tours", d: "We design customised travel experiences across Morocco, so your journey is authentic, immersive and aligned with your preferences." },
  { t: "Professional local expertise", d: "With over 15 years of experience, our bilingual drivers and guides provide deep cultural insight and seamless logistics." },
  { t: "Reliable, licensed services", d: "Licensed transportation, comfortable vehicles and a support team available seven days a week." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumb([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]), pageSchema("AboutPage", "About Atlas Private Tours", "/about", "Atlas Private Tours is a local Moroccan Berber travel agency in Fes with over 15 years of experience.")]} />
      <PageHero eyebrow="About us" title="Born in the Sahara. Guiding since long before it was a business." image="/images/2017-12-atlas-private-tours-11.jpeg" />
      <section className="container-x grid gap-14 py-20 md:grid-cols-2 md:py-28">
        <div className="space-y-5 leading-relaxed text-ink/85">
          <p className="display text-3xl leading-snug">Atlas Private Tours is a local Moroccan travel agency with over 15 years’ experience of showing guests the best of Morocco.</p>
          <p>The company owner, staff, drivers and guides grew up in the Sahara desert. They know the secrets of the region, understand Moroccan culture and traditions, and are proud to share them with their guests.</p>
          <p>We know that travellers want to get off the beaten track and experience the real Morocco, while still appreciating reliable, comfortable transport and relaxed accommodation after an eventful day.</p>
          <p>Our drivers are qualified, experienced, bilingual local people. We work within the regulations that govern guides and professional drivers, and every driver and vehicle is registered and carries the associated permits.</p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden"><Image src="/images/2017-12-atlas-private-tours-29.jpg" alt="Atlas Private Tours guest in the Sahara dunes" fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" /></div>
      </section>
      <section className="bg-night text-sand">
        <div className="container-x py-20 md:py-28">
          <h2 className="display text-4xl md:text-5xl">What we offer</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {offers.map((o) => <div key={o.t} className="border-t border-gold/60 pt-5"><h3 className="display text-2xl">{o.t}</h3><p className="mt-3 text-sm leading-relaxed text-sand/70">{o.d}</p></div>)}
          </div>
          <Link href="/contact" className="btn btn-primary mt-14">Talk to us</Link>
        </div>
      </section>
    </>
  );
}
