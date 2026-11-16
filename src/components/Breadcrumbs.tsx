import Link from "next/link";

export default function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-[.16em] text-white/70">
      <ol className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            {it.href ? <Link href={it.href} className="hover:text-gold">{it.name}</Link> : <span aria-current="page" className="text-white">{it.name}</span>}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
