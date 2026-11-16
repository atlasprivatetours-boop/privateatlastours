import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

const clip = (v: unknown, n = 2000) => String(v ?? "").slice(0, n).trim();

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (b.website) return NextResponse.json({ ok: true }); // honeypot
  const d = {
    name: clip(b.name, 120), email: clip(b.email, 200), phone: clip(b.phone, 60), date: clip(b.date, 80),
    people: clip(b.people, 20), days: clip(b.days, 40), city: clip(b.city, 40), interests: clip(b.interests, 300), tour: clip(b.tour, 200),
    contactPref: clip(b.contactPref, 40), subject: clip(b.subject, 200), message: clip(b.message),
  };
  if (!d.name || !/^\S+@\S+\.\S+$/.test(d.email)) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[enquiry] RESEND_API_KEY not set; enquiry was not emailed");
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  }
  const text = Object.entries(d).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM || "Atlas Private Tours <onboarding@resend.dev>",
      to: [process.env.ENQUIRY_TO || SITE.email],
      reply_to: d.email,
      subject: `New enquiry from ${d.name}${d.subject ? ` - ${d.subject}` : ""}`,
      text,
    }),
  });
  return NextResponse.json({ ok: r.ok }, { status: r.ok ? 200 : 502 });
}
