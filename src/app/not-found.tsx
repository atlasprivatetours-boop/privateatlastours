import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center bg-night px-5 text-center text-sand">
      <div>
        <p className="eyebrow mb-4">404</p>
        <h1 className="display text-5xl md:text-7xl">This path leads nowhere.</h1>
        <p className="mt-4 text-sand/70">The page you are looking for has moved or never existed.</p>
        <div className="mt-8 flex justify-center gap-3"><Link href="/" className="btn btn-primary">Home</Link><Link href="/tours" className="btn btn-ghost">Our tours</Link></div>
      </div>
    </section>
  );
}
