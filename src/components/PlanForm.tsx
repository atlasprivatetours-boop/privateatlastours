"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const LENGTHS = ["1 day", "3 days", "4 days", "5 days", "6 days", "7 days", "8 days", "9 days", "10 days or more", "Not sure yet"];
const STYLES = ["Sahara desert", "Imperial cities", "Atlantic coast", "Blue city of Chefchaouen", "Atlas Mountains", "Day trips"];
const CONTACT = ["Email", "WhatsApp", "Phone call"];

const box = "w-full border border-ink/20 bg-white/70 px-4 py-3 text-ink outline-none transition-colors focus:border-clay focus:bg-white";
const lab = "mb-1.5 block text-[.68rem] font-semibold uppercase tracking-[.2em] text-muted";

export default function PlanForm({ tours, whatsapp, cities }: { tours: { slug: string; name: string }[]; whatsapp: string; cities: string[] }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [tour, setTour] = useState("");

  // A link such as /contact?tour=<slug> pre-selects that tour.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("tour");
    if (slug && tours.some((t) => t.slug === slug)) setTour(slug);
  }, [tours]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string> = {};
    for (const [k, v] of fd.entries()) if (k !== "style" && typeof v === "string") data[k] = v;
    data.interests = fd.getAll("style").join(", ");
    const picked = tours.find((t) => t.slug === data.tour);
    data.subject = picked ? picked.name : "Plan your journey";
    data.tour = picked ? picked.name : "";
    try {
      const r = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      setState(r.ok ? "ok" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "ok")
    return (
      <div role="status" className="border border-gold/60 bg-white/60 p-8 md:p-12">
        <p className="display text-4xl">Thank you.</p>
        <p className="mt-3 max-w-md text-ink/80">We have your plans and will reply personally. If you would rather talk now, you can also reach us on WhatsApp.</p>
        <a href={whatsapp} className="btn btn-primary mt-7">Chat on WhatsApp</a>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="border border-ink/10 bg-white/50 p-6 shadow-xl shadow-ink/5 md:p-10">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="mb-6 flex items-center gap-4"><span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-semibold text-gold">1</span><span className="display text-3xl">Your trip</span></legend>
        <div>
          <label className={lab} htmlFor="p-city">Starting city</label>
          <select id="p-city" name="city" defaultValue="" className={box}>
            <option value="">Choose…</option>
            {[...cities, "Not sure yet"].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={lab} htmlFor="p-days">How long</label>
          <select id="p-days" name="days" defaultValue="" className={box}>
            <option value="">Choose…</option>
            {LENGTHS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={lab} htmlFor="p-people">Number of travellers</label>
          <input id="p-people" name="people" type="number" min={1} max={50} inputMode="numeric" className={box} />
        </div>
        <div>
          <label className={lab} htmlFor="p-date">When would you like to travel?</label>
          <input id="p-date" name="date" type="text" placeholder="e.g. April 2027" className={box} />
        </div>
        <div className="sm:col-span-2">
          <p className={lab} id="p-style-l">What draws you to Morocco?</p>
          <div role="group" aria-labelledby="p-style-l" className="flex flex-wrap gap-2.5">
            {STYLES.map((s) => (
              <label key={s} className="cursor-pointer">
                <input type="checkbox" name="style" value={s} className="peer sr-only" />
                <span className="inline-block border border-ink/25 bg-white/60 px-4 py-2.5 text-sm transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-sand peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-clay">{s}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className={lab} htmlFor="p-tour">A tour you like (optional)</label>
          <select id="p-tour" name="tour" value={tour} onChange={(e) => setTour(e.target.value)} className={box}>
            <option value="">No, start from a blank page</option>
            {tours.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={lab} htmlFor="p-msg">Anything else we should know?</label>
          <textarea id="p-msg" name="message" rows={4} placeholder="Interests, travel pace, who is coming, special occasions, dietary needs…" className={box} />
        </div>
      </fieldset>

      <div className="mt-12 border-t border-ink/10" />
      <fieldset className="mt-10 grid gap-6 sm:grid-cols-2">
        <legend className="mb-6 flex items-center gap-4"><span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-semibold text-gold">2</span><span className="display text-3xl">About you</span></legend>
        <div>
          <label className={lab} htmlFor="p-name">Name *</label>
          <input id="p-name" name="name" required autoComplete="name" className={box} />
        </div>
        <div>
          <label className={lab} htmlFor="p-email">Email *</label>
          <input id="p-email" name="email" type="email" required autoComplete="email" className={box} />
        </div>
        <div>
          <label className={lab} htmlFor="p-phone">Phone / WhatsApp</label>
          <input id="p-phone" name="phone" type="tel" autoComplete="tel" className={box} />
        </div>
        <div>
          <label className={lab} htmlFor="p-pref">Best way to reach you</label>
          <select id="p-pref" name="contactPref" defaultValue="Email" className={box}>
            {CONTACT.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </fieldset>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <button disabled={state === "sending"} className="btn btn-primary">{state === "sending" ? "Sending…" : "Send my plans"}</button>
        {state === "error" && <p role="alert" className="text-sm text-clay">Something went wrong. Please email or WhatsApp us directly.</p>}
      </div>
      <p className="mt-5 text-xs text-muted">We use your details only to reply about your trip. See our <Link href="/privacy" className="underline">privacy policy</Link>.</p>
    </form>
  );
}
