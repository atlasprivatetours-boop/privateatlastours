import Image from "next/image";

export default function PageHero({ eyebrow, title, intro, image, alt = "", children }: { eyebrow?: string; title: string; intro?: string; image: string; alt?: string; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <Image src={image} alt={alt} fill preload fetchPriority="high" quality={60} sizes="100vw" className="-z-10 object-cover opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/40 to-night/60" />
      <div className="container-x reveal pb-16 pt-40 md:pb-24 md:pt-52">
        {children}
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="display max-w-4xl text-5xl md:text-7xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>}
      </div>
    </section>
  );
}
