"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/lib/site";
import { Logo } from "@/components/Logo";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const home = pathname === "/";
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  const dark = solid || open || !home;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${dark ? "bg-night text-sand" : "bg-transparent text-white"}`}>
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo className="h-[4.25rem]" priority />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-[.74rem] xl:gap-8 xl:text-[.78rem] uppercase tracking-[.14em] lg:flex">
          {NAV.slice(0, -1).map((n) => (
            <Link key={n.href} href={n.href} className={`border-b border-transparent py-2 transition-colors hover:border-gold ${pathname.startsWith(n.href) ? "!border-gold" : ""}`}>
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary !min-h-0 !py-2.5">Plan your journey</Link>
        </nav>
        <button className="-mr-3 p-3 lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          <span className="block w-7 space-y-1.5" aria-hidden>
            <span className={`block h-px bg-current transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-current transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-night text-sand lg:hidden">
          <ul className="container-x space-y-1 py-8">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="display block border-b border-white/10 py-3 text-4xl">{n.label}</Link>
              </li>
            ))}
          </ul>
          <div className="container-x space-y-3 pb-12 text-sm">
            <a href={SITE.whatsapp} className="btn btn-primary w-full">WhatsApp us</a>
            <a href={SITE.phoneHref} className="block py-2 text-center">{SITE.phone}</a>
          </div>
        </nav>
      )}
    </header>
  );
}
