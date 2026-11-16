import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import TourReviews from "@/components/TourReviews";
import { reviewsForTrip } from "@/lib/reviews";
import { breadcrumb, dayTripSchema } from "@/lib/schema";
import { dayTrips, excerpt, getTrip, tourImageFallback, tripImage } from "@/lib/content";
import { SITE } from "@/lib/site";

export const generateStaticParams = () => dayTrips.map((d) => ({ slug: d.slug }));

export async function generateMetadata(props: PageProps<"/day-trips/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const d = getTrip(slug);
  if (!d) return {};
  return { title: `${d.name} Day Trip, Private Tour`, description: excerpt(d.text, 155), alternates: { canonical: `/day-trips/${d.slug}` } };
}

export default async function DayTripPage(props: PageProps<"/day-trips/[slug]">) {
  const { slug } = await props.params;
  const d = getTrip(slug);
  if (!d) notFound();
  const reviews = reviewsForTrip(d.slug);
  return (
    <>
      <JsonLd data={[dayTripSchema(d), breadcrumb([{ name: "Home", path: "/" }, { name: "Day trips", path: "/day-trips" }, { name: d.name, path: `/day-trips/${d.slug}` }])]} />
      <PageHero title={`${d.name} day trip`} image={tripImage[d.slug] ?? tourImageFallback} alt={`${d.name}`}>
        <Breadcrumbs items={[{ name: "Day trips", href: "/day-trips" }, { name: d.name }]} />
        <p className="eyebrow mb-4">Private · 1 day</p>
      </PageHero>
      <div className="container-x grid gap-14 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
        <div>
          <p className="display text-2xl leading-snug md:text-3xl">{d.text}</p>
          <p className="mt-8 text-sm text-muted">Departure point, timing and price depend on where you are staying and your group size. Contact us and we will arrange a private driver-guide.</p>
          <a href={SITE.whatsapp} className="btn btn-dark mt-8">Ask us on WhatsApp</a>
        </div>
        <div className="bg-night p-7 text-sand"><p className="display mb-5 text-3xl">Reserve this day trip</p><EnquiryForm dark subject={`${d.name} day trip`} /></div>
      </div>
      {reviews.length > 0 && <TourReviews heading="What guests say about this day trip" reviews={reviews} />}
    </>
  );
}
