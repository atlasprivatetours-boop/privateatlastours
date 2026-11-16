import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { cityPath, origins } from "@/lib/content";

export default function Footer() {
  return (
    <>
      <footer className="bg-night text-sand/80">
        <div className="container-x grid gap-12 py-20 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo className="h-28" />
            <p className="mt-4 max-w-md leading-relaxed">
              A local Berber travel agency in Fes. Over 15 years designing private journeys across Morocco, with guides and drivers who grew up in the Sahara.
            </p>
            <p className="mt-6 flex max-w-md flex-wrap gap-x-5 gap-y-2 text-sm">
              {origins.map((o) => (
                <Link key={o} className="hover:text-gold" href={cityPath(o)}>Tours from {o}</Link>
              ))}
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-2.5 text-sm">
              {NAV.map((n) => (
                <li key={n.href}><Link className="hover:text-gold" href={n.href}>{n.label}</Link></li>
              ))}
              <li><Link className="hover:text-gold" href="/gallery">Gallery</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-2.5 text-sm">
              <li><a className="hover:text-gold" href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li><a className="break-all hover:text-gold" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a className="hover:text-gold" href={SITE.whatsapp}>WhatsApp</a></li>
              <li><a className="hover:text-gold" href={SITE.facebook} rel="noopener" target="_blank">Facebook</a></li>
              <li><a className="hover:text-gold" href={SITE.tripadvisor} rel="noopener" target="_blank">Tripadvisor</a></li>
              <li>Based in {SITE.base}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-xs text-sand/50">
          <div className="container-x flex flex-wrap justify-between gap-2">
            <span>© {new Date().getFullYear()} Atlas Private Tours. All rights reserved.</span>
            <span className="flex gap-4"><Link className="hover:text-gold" href="/privacy">Privacy policy</Link><span>Private tours in Morocco</span></span>
          </div>
        </div>
      </footer>
      <a href={SITE.whatsapp} aria-label="Chat with us on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1f8f4e] text-white shadow-xl transition-transform hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.200 8.200 0 0 1-4.200-1.200l-.3-.2-3 .8.8-2.900-.2-.3A8.200 8.200 0 1 1 12 20.200zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8s-.4-.1-.6.100-.7.800-.8 1-.3.200-.5.100a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.200-.4.700-1.300.1-.2 0-.3 0-.4l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.300 3 3 0 0 0-.9 2.200 5.200 5.200 0 0 0 1.100 2.800c.1.200 2.100 3.300 5.200 4.500 2.900 1.100 3 .8 3.600.7.600-.1 1.800-.7 2-1.400.3-.7.300-1.300.2-1.400s-.3-.2-.5-.3z" />
        </svg>
      </a>
    </>
  );
}
