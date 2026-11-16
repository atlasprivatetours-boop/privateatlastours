"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// A horizontally scrolling row of cards on a dark background. The heading sits on the left, the previous/next buttons
// and an optional link on the right. The cards themselves are server-rendered children.
export default function CardStrip({ label, header, aside, children }: { label: string; header: React.ReactNode; aside?: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const move = (dir: 1 | -1) => {
    const el = ref.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const btn = "grid h-12 w-12 place-items-center border border-sand/40 text-sand transition-colors hover:border-gold hover:bg-gold hover:text-night disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

  return (
    <div>
      <div className="container-x flex flex-wrap items-end justify-between gap-x-8 gap-y-8 pb-12 pt-24 md:pt-32">
        <div className="min-w-0">{header}</div>
        <div className="flex items-center gap-6">
          {aside}
          <div className="flex gap-2">
            <button type="button" className={btn} onClick={() => move(-1)} disabled={edge.start} aria-label={`Previous ${label}`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button type="button" className={btn} onClick={() => move(1)} disabled={edge.end} aria-label={`Next ${label}`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
      {/* scroll-pl keeps the snapped card at the same left offset as the page content instead of the screen edge. */}
      <div
        ref={ref}
        onScroll={update}
        className="strip flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-5 px-5 pb-20 md:scroll-pl-[max(2.5rem,calc((100vw_-_76rem)/2_+_2.5rem))] md:px-[max(2.5rem,calc((100vw_-_76rem)/2_+_2.5rem))]"
      >
        {children}
      </div>
    </div>
  );
}
