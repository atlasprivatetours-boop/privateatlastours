import Link from "next/link";
import { Star } from "@/components/Ornament";

// Eyebrow + heading + optional link. Wrap one word of the heading in <span className="accent"> for colour.
export default function SectionHeader({
  eyebrow, children, intro, href, hrefLabel, center = false,
}: {
  eyebrow: string; children: React.ReactNode; intro?: string; href?: string; hrefLabel?: string; center?: boolean;
}) {
  return (
    <div className={`reveal-on-scroll flex flex-wrap items-end justify-between gap-6 ${center ? "justify-center text-center" : ""}`}>
      <div className={center ? "mx-auto" : ""}>
        <p className={`eyebrow mb-4 flex items-center gap-3 ${center ? "justify-center" : ""}`}><Star className="h-3 w-3" />{eyebrow}</p>
        <h2 className="display max-w-3xl text-4xl md:text-6xl">{children}</h2>
        {intro && <p className={`mt-4 max-w-xl text-muted ${center ? "mx-auto" : ""}`}>{intro}</p>}
      </div>
      {href && hrefLabel && (
        <Link href={href} className="border-b border-clay pb-1 text-xs font-semibold uppercase tracking-[.18em] text-clay hover:text-clay-dark">{hrefLabel}</Link>
      )}
    </div>
  );
}
