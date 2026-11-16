"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import TourCard from "@/components/TourCard";
import { Star } from "@/components/Ornament";
import { ALL_ORIGINS, LENGTHS, STYLES } from "@/lib/filters";
import type { TourSummary } from "@/lib/content";

type Filters = { from: string; length: string; style: string };
type Sort = "recommended" | "shortest" | "longest";
const EMPTY: Filters = { from: "", length: "", style: "" };

const matches = (t: TourSummary, f: Filters) => {
  const len = LENGTHS.find((l) => l.id === f.length);
  return (!f.from || t.origin === f.from) && (!len || len.test(t.days)) && (!f.style || t.styles.includes(f.style as never));
};

function Group({
  legend, name, value, options, onChange,
}: {
  legend: string; name: keyof Filters; value: string;
  options: { id: string; label: string; count: number }[];
  onChange: (k: keyof Filters, v: string) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 flex items-center gap-2 text-[.68rem] font-semibold uppercase tracking-[.2em] text-muted">
        <Star className="h-2.5 w-2.5 text-gold" />{legend}
      </legend>
      {/* One swipeable row on phones, wrapping pills from tablet up */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden">
        {[{ id: "", label: "Any", count: -1 }, ...options].map((o) => {
          const on = value === o.id;
          const empty = o.count === 0 && !on;
          return (
            <button
              key={o.id || "any"}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(name, on && o.id ? "" : o.id)}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 border px-4 text-sm transition-colors ${
                on ? "border-ink bg-ink text-sand" : empty ? "border-ink/15 text-ink/40 hover:border-ink/40" : "border-ink/25 hover:border-ink"
              }`}
            >
              {o.label}
              {o.count >= 0 && <span className={`text-xs tabular-nums ${on ? "text-gold" : "text-muted"}`}>{o.count}</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function TourFinder({ tours }: { tours: TourSummary[] }) {
  const [f, setF] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState<Sort>("recommended");
  // Only cities that have a tour in the list are offered, so a city with no visible tours never shows as an empty filter.
  const origins = useMemo(() => ALL_ORIGINS.filter((o) => tours.some((t) => t.origin === o)), [tours]);

  // Read ?from=&length=&style= on first load so links from the home page pre-select the filters.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const next: Filters = {
      from: origins.find((o) => o.toLowerCase() === (p.get("from") ?? "").toLowerCase()) ?? "",
      length: LENGTHS.find((l) => l.id === p.get("length"))?.id ?? "",
      style: STYLES.find((s) => s === p.get("style")) ?? "",
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setF(next);
  }, [origins]);

  const set = (k: keyof Filters, v: string) => {
    const next = { ...f, [k]: v };
    setF(next);
    const p = new URLSearchParams();
    (Object.keys(next) as (keyof Filters)[]).forEach((key) => next[key] && p.set(key, next[key]));
    window.history.replaceState(null, "", p.toString() ? `?${p}` : window.location.pathname);
  };
  const reset = () => { setF(EMPTY); window.history.replaceState(null, "", window.location.pathname); };

  // Counts are "what you would get if you picked this", given the other two filters.
  const counts = useMemo(() => ({
    from: origins.map((o) => tours.filter((t) => matches(t, { ...f, from: o })).length),
    length: LENGTHS.map((l) => tours.filter((t) => matches(t, { ...f, length: l.id })).length),
    style: STYLES.map((s) => tours.filter((t) => matches(t, { ...f, style: s })).length),
  }), [tours, f, origins]);

  const results = useMemo(() => {
    const list = tours.filter((t) => matches(t, f));
    if (sort === "shortest") return list.sort((a, b) => a.days - b.days);
    if (sort === "longest") return list.sort((a, b) => b.days - a.days);
    return list.sort((a, b) => origins.indexOf(a.origin as never) - origins.indexOf(b.origin as never) || a.days - b.days);
  }, [tours, f, sort, origins]);
  const active = !!(f.from || f.length || f.style);
  const chips = [f.from && `From ${f.from}`, LENGTHS.find((l) => l.id === f.length)?.label, f.style].filter(Boolean) as string[];

  return (
    <div>
      <div className="border border-ink/15 bg-white/50 p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="display text-3xl md:text-4xl">Find your <span className="accent">journey</span></h2>
          <p className="text-sm text-muted">Choose any combination. Every tour can be adapted afterwards.</p>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          <Group legend="Starting city" name="from" value={f.from} onChange={set} options={origins.map((o, i) => ({ id: o, label: o, count: counts.from[i] }))} />
          <Group legend="Length" name="length" value={f.length} onChange={set} options={LENGTHS.map((l, i) => ({ id: l.id, label: l.label, count: counts.length[i] }))} />
          <Group legend="Style" name="style" value={f.style} onChange={set} options={STYLES.map((s, i) => ({ id: s, label: s, count: counts.style[i] }))} />
        </div>
      </div>

      <h2 className="sr-only">Matching tours</h2>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4" aria-live="polite">
        <div className="flex flex-wrap items-center gap-3">
          <p className="display text-2xl">{results.length === 1 ? "1 tour" : `${results.length} tours`}</p>
          {chips.map((c) => <span key={c} className="border border-clay/40 px-3 py-1 text-xs uppercase tracking-[.14em] text-clay">{c}</span>)}
          {active && <button type="button" onClick={reset} className="border-b border-clay pb-0.5 text-xs font-semibold uppercase tracking-[.18em] text-clay">Clear</button>}
        </div>
        <label className="flex items-center gap-3 text-xs uppercase tracking-[.16em] text-muted">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="min-h-11 border border-ink/25 bg-white/70 px-3 text-sm normal-case tracking-normal text-ink outline-none focus:border-clay">
            <option value="recommended">By starting city</option>
            <option value="shortest">Shortest first</option>
            <option value="longest">Longest first</option>
          </select>
        </label>
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((t) => <TourCard key={t.slug} tour={t} tags={t.styles.filter((x) => x !== "Desert escape")} />)}
          <Link href="/contact" className="zellige group relative flex min-h-80 flex-col justify-between overflow-hidden bg-night p-8 text-sand">
            <Star className="h-6 w-6 text-gold" />
            <div>
              <p className="display text-3xl leading-tight md:text-4xl">Not quite right? <span className="accent">We’ll build yours.</span></p>
              <p className="mt-3 text-sm leading-relaxed text-sand/75">Different dates, a longer stay or an extra night in the desert. Every journey is private and adjustable.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-gold">Design my journey <span aria-hidden className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-12" /></span>
            </div>
          </Link>
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-ink/30 p-10 text-center">
          <p className="display text-3xl">Nothing matches that exactly.</p>
          <p className="mx-auto mt-3 max-w-md text-muted">Every journey is private and can be adapted, so tell us what you have in mind and we will build it.</p>
          <div className="mt-6 flex justify-center gap-3"><Link href="/contact" className="btn btn-primary">Design my journey</Link><button type="button" onClick={reset} className="btn btn-dark">Show all tours</button></div>
        </div>
      )}
    </div>
  );
}
