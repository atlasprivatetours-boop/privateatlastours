"use client";
import Link from "next/link";
import { useState } from "react";

export default function EnquiryForm({ subject = "", dark = false }: { subject?: string; dark?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(fd) });
      setState(r.ok ? "ok" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "ok")
    return (
      <div role="status" className="border border-gold/50 p-8">
        <p className="display text-3xl">Thank you.</p>
        <p className="mt-2 opacity-80">We have your enquiry and will reply personally, usually within one working day.</p>
      </div>
    );

  const field = `w-full bg-transparent border-b py-3 outline-none transition-colors ${dark ? "border-white/30 focus:border-gold placeholder:text-white/40" : "border-ink/25 focus:border-clay placeholder:text-ink/40"}`;
  const lab = "mb-1 block text-[.68rem] uppercase tracking-[.2em] opacity-70";
  return (
    <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="subject" value={subject} />
      <div><label className={lab} htmlFor="f-name">Name *</label><input id="f-name" name="name" required autoComplete="name" className={field} /></div>
      <div><label className={lab} htmlFor="f-email">Email *</label><input id="f-email" name="email" type="email" required autoComplete="email" className={field} /></div>
      <div><label className={lab} htmlFor="f-phone">Phone / WhatsApp</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" className={field} /></div>
      <div><label className={lab} htmlFor="f-date">Estimated travel date</label><input id="f-date" name="date" type="text" placeholder="e.g. April 2027" className={field} /></div>
      <div><label className={lab} htmlFor="f-people">Number of travellers</label><input id="f-people" name="people" inputMode="numeric" className={field} /></div>
      <div><label className={lab} htmlFor="f-days">Days you would like</label><input id="f-days" name="days" inputMode="numeric" className={field} /></div>
      <div className="sm:col-span-2">
        <label className={lab} htmlFor="f-msg">Tell us about your journey</label>
        <textarea id="f-msg" name="message" rows={4} defaultValue={subject ? `I am interested in: ${subject}` : ""} className={field} />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button disabled={state === "sending"} className="btn btn-primary">{state === "sending" ? "Sending…" : "Send enquiry"}</button>
        {state === "error" && <p role="alert" className="text-sm text-clay">Something went wrong. Please email or WhatsApp us directly.</p>}
      </div>
      <p className="text-xs opacity-70 sm:col-span-2">We use your details only to reply about your trip. See our <Link href="/privacy" className="underline">privacy policy</Link>.</p>
    </form>
  );
}
