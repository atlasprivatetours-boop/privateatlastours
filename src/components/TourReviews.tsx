import Link from "next/link";
import { excerpt, type Testimonial } from "@/lib/content";
import type { MatchedReview } from "@/lib/reviews";

type Item = Testimonial & Partial<Pick<MatchedReview, "match" | "trip">>;

export default function TourReviews({ heading, intro, reviews }: { heading: string; intro?: string; reviews: Item[] }) {
  if (!reviews.length) return null;
  return (
    <section className="container-x py-16 md:py-20" aria-labelledby="tour-reviews">
      <p className="eyebrow mb-3">Guest stories</p>
      <h2 id="tour-reviews" className="display text-4xl md:text-5xl">{heading}</h2>
      {intro && <p className="mt-3 max-w-2xl text-muted">{intro}</p>}
      <div className={`mt-10 grid gap-6 ${reviews.length > 1 ? "md:grid-cols-2" : "max-w-3xl"}`}>
        {reviews.map((r) => (
          <figure key={r.author} className="flex flex-col border border-ink/15 bg-white/40 p-8">
            {r.trip && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[.16em] text-clay">
                {r.match === "exact" ? "Travelled:" : "A similar journey:"} {r.trip}
              </p>
            )}
            <figcaption className="display text-2xl leading-tight">{r.title}</figcaption>
            <blockquote className="mt-4 flex-1 leading-relaxed text-ink/80">“{excerpt(r.text, 380)}”</blockquote>
            <p className="mt-6 border-t border-ink/10 pt-4 text-xs uppercase tracking-[.16em] text-muted">{r.author} · Posted on Tripadvisor</p>
          </figure>
        ))}
      </div>
      <Link href="/testimonials" className="mt-8 inline-block border-b border-clay pb-1 text-xs font-semibold uppercase tracking-[.18em] text-clay">Read all guest stories</Link>
    </section>
  );
}
