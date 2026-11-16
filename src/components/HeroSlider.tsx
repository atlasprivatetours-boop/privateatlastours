"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type HeroSlide = { src: string; alt: string; place: string; href: string; pos?: string };

const INTERVAL = 7000;

// The first slide is server-rendered and preloaded, so it is the LCP element and needs no JavaScript to appear.
// The remaining slides mount only after the page has loaded and gone idle, so they never compete with it for bandwidth.
export default function HeroSlider({ slides, children }: { slides: HeroSlide[]; children: React.ReactNode }) {
  const [i, setI] = useState(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [hold, setHold] = useState(false); // hover or keyboard focus inside the hero
  const reduced = useRef(false);
  const n = slides.length;

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) setPlaying(false);
    let t: number;
    const start = () => { t = window.setTimeout(() => setReady(true), 1200); };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => { window.clearTimeout(t); window.removeEventListener("load", start); };
  }, []);

  const go = useCallback((to: number) => { setReady(true); setI((to + n) % n); }, [n]);

  useEffect(() => {
    if (!ready || !playing || hold) return;
    const id = window.setInterval(() => { if (!document.hidden) setI((c) => (c + 1) % n); }, INTERVAL);
    return () => window.clearInterval(id);
  }, [ready, playing, hold, n, i]);

  const active = slides[i];
  const btn = "grid h-11 w-11 place-items-center border border-white/40 text-white transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Morocco highlights"
      className="relative isolate flex min-h-[min(92svh,58rem)] items-end overflow-hidden bg-night text-white"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      {slides.map((s, k) =>
        k === 0 || ready ? (
          <div key={s.src} aria-hidden={k !== i} className={`absolute inset-0 -z-10 transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none ${k === i ? "opacity-100" : "opacity-0"}`}>
            <Image src={s.src} alt={k === i ? s.alt : ""} fill preload={k === 0} fetchPriority={k === 0 ? "high" : "low"} quality={60} sizes="100vw" style={{ objectPosition: s.pos }} className="object-cover" />
          </div>
        ) : null,
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/30 to-night/50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/55 via-night/15 to-transparent" />

      <div className="container-x reveal pb-36 pt-44 md:pb-40">{children}</div>

      <div className="container-x absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pb-8">
        <p className="min-w-0 text-sm text-white/85" aria-live={playing ? "off" : "polite"}>
          <span className="eyebrow !text-gold">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
          <span className="ml-4">{active.place}</span>
          <Link href={active.href} className="ml-4 border-b border-gold pb-0.5 text-xs font-semibold uppercase tracking-[.16em] text-sand hover:text-gold">Explore</Link>
        </p>
        <div className="flex items-center gap-2">
          <div className="mr-2 hidden items-center sm:flex" role="group" aria-label="Choose a slide">
            {slides.map((s, k) => (
              <button key={s.src} type="button" onClick={() => go(k)} aria-label={`Show slide ${k + 1}: ${s.place}`} aria-current={k === i} className="group grid h-6 w-8 place-items-center focus-visible:outline-2 focus-visible:outline-white">
                <span className={`h-0.5 w-6 transition-colors ${k === i ? "bg-gold" : "bg-white/40 group-hover:bg-white/80"}`} />
              </button>
            ))}
          </div>
          <button type="button" className={btn} onClick={() => go(i - 1)} aria-label="Previous slide">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" className={btn} onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.500 5H17v14h-3.500z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
            )}
          </button>
          <button type="button" className={btn} onClick={() => go(i + 1)} aria-label="Next slide">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
