import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Atlas Private Tours collects, uses and protects the personal details you send us when you enquire about a private tour in Morocco.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "November 2026";

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={[breadcrumb([{ name: "Home", path: "/" }, { name: "Privacy policy", path: "/privacy" }]), pageSchema("WebPage", "Privacy policy", "/privacy", "How Atlas Private Tours collects and uses the details you send us.")]} />
      <PageHero eyebrow="Privacy" title="Your details, handled with care" intro={`Last updated ${UPDATED}.`} image="/images/2017-12-atlas-private-tours-35.jpg" />
      <div className="container-x prose-atlas mx-auto max-w-3xl py-16 md:py-24">
        <p>This policy explains what personal information {SITE.name} collects through this website, why we collect it and what we do with it. We keep it short because we collect very little.</p>

        <h2>Who we are</h2>
        <p>{SITE.name} is a travel agency based in {SITE.base}. You can reach us at <a className="text-clay underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> or on {SITE.phone}.</p>

        <h2>What we collect</h2>
        <p>We only collect what you choose to send us through the enquiry or contact form:</p>
        <ul className="mb-6 list-disc space-y-1.5 pl-6">
          <li>your name and email address (required)</li>
          <li>your phone or WhatsApp number, estimated travel date, number of travellers and number of days (optional)</li>
          <li>your message, and the tour you were looking at when you wrote to us</li>
        </ul>
        <p>If you contact us by email, phone or WhatsApp instead, we receive the details you share in that conversation.</p>

        <h2>How we use it</h2>
        <p>We use your details to reply to your enquiry, to plan and quote your trip, and to stay in touch about it. We do not use them for anything unrelated, and we do not sell them.</p>

        <h2>Who else sees it</h2>
        <p>When you submit the form, your message is sent to us as an email through an email delivery service. We may share the details needed to arrange your trip with the drivers, guides, hotels and camps who will look after you. We do not share your details with anyone else unless the law requires it.</p>

        <h2>Cookies and tracking</h2>
        <p>This website does not use advertising or analytics cookies, and it does not track you across other sites. Links to Tripadvisor, Facebook and WhatsApp take you to those services, which have their own privacy policies.</p>

        <h2>How long we keep it</h2>
        <p>We keep your enquiry for as long as we need it to answer you and arrange your trip, and afterwards for as long as is reasonable in case you get back in touch. You can ask us to delete it at any time.</p>

        <h2>Your choices</h2>
        <p>You can ask us what details we hold about you, ask us to correct or delete them, or ask us to stop contacting you. Email <a className="text-clay underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will respond.</p>

        <h2>Changes to this policy</h2>
        <p>If we change how we handle your details, we will update this page and the date at the top.</p>
      </div>
    </>
  );
}
