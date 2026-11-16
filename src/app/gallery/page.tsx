import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { gallery } from "@/lib/content";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Photo Gallery: Sahara, Medinas & Kasbahs",
  description: "Photographs from Atlas Private Tours journeys across Morocco: Sahara dunes, kasbahs, medinas, souks and mountain valleys.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={[breadcrumb([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }]), pageSchema("WebPage", "Photo gallery", "/gallery", "Photos of the Sahara, medinas and kasbahs on our private Morocco tours.")]} />
      <PageHero eyebrow="Gallery" title="Moments from the road" image="/images/2017-12-atlas-private-tours-60.jpg" />
      <div className="container-x py-16">
        <ul className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>li]:mb-3">
          {gallery.map((src, i) => (
            <li key={src} className="break-inside-avoid overflow-hidden bg-sand-2">
              <Image src={src} alt={`Atlas Private Tours Morocco photograph ${i + 1}`} width={600} height={600} sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" loading={i < 6 ? "eager" : "lazy"} className="h-auto w-full" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
