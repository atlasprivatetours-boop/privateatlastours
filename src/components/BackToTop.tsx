"use client";
import { useEffect, useState } from "react";

// Appears after the visitor has scrolled a screen or so, sits at the bottom-left, opposite the WhatsApp button, and clears the mobile booking bar.
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0 })}
      className={`fixed bottom-24 left-5 z-40 grid h-12 w-12 place-items-center border border-gold/60 bg-night text-sand shadow-xl transition-[opacity,background-color,color] duration-300 ${show ? "opacity-100" : "pointer-events-none opacity-0"} hover:bg-clay hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 15l7-7 7 7" /></svg>
    </button>
  );
}
