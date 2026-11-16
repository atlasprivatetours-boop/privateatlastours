import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import TourCard from "@/components/TourCard";
import { breadcrumb, listSchema } from "@/lib/schema";
import { cityPath, cityTours, joinCities, origins, styleLabels } from "@/lib/content";

export const generateStaticParams = () => origins.map((o) => ({ city: o.toLowerCase() }));

// Style names read mid-sentence, keeping the proper nouns capitalised.
const lower = (s: string) => s.toLowerCase().replace("sahara", "Sahara").replace("atlantic", "Atlantic");
const find = (slug: string) => origins.find((o) => o.toLowerCase() === slug);

// Everything here comes from the tours themselves: the count, the length range and the styles their itineraries contain.
function facts(city: string) {
  const list = cityTours(city);
  const days = list.map((t) => t.days);
  const styles = [...new Set(list.flatMap((t) => styleLabels(t)))];
  const range = Math.min(...days) === Math.max(...days) ? `${days[0]} days` : `${Math.min(...days)} to ${Math.max(...days)} days`;
  return { list, range, styles };
}

export async function generateMetadata(props: PageProps<"/tours/from/[city]">): Promise<Metadata> {
  const { city: slug } = await props.params;
  const city = find(slug);
  if (!city) return {};
  const { list, range, styles } = facts(city);
  const what = styles.length ? `${joinCities(styles.map(lower))}. ` : "";
  return {
    title: `Private Morocco Tours from ${city}`,
    description: `${list.length} private tours from ${city}, ${range}: ${what}Local guides and drivers, adjustable to your dates.`.replace(/: \./, "."),
    alternates: { canonical: cityPath(city) },
  };
}

export default async function CityToursPage(props: PageProps<"/tours/from/[city]">) {
  const { city: slug } = await props.params;
  const city = find(slug);
  if (!city) notFound();
  const { list, range, styles } = facts(city);
  const others = origins.filter((o) => o !== city);
  const intro = `${list.length} private ${list.length === 1 ? "tour" : "tours"} start in ${city}, from ${range}${styles.length ? `, covering ${joinCities(styles.map(lower))}` : ""}. Every journey is private and can be adjusted to your dates, pace and interests.`;
  return (
    <>
      <JsonLd
        data={[
          breadcrumb([{ name: "Home", path: "/" }, { name: "Tours", path: "/tours" }, { name: `From ${city}`, path: cityPath(city) }]),
          listSchema(`Private Morocco tours from ${city}`, cityPath(city), intro, list.map((t) => ({ name: t.name, path: `/tours/${t.slug}`, image: t.hero }))),
        ]}
      />
      <PageHero title={`Private Morocco tours from ${city}`} intro={intro} image={list[0].hero} alt={list[0].name}>
        <Breadcrumbs items={[{ name: "Tours", href: "/tours" }, { name: `From ${city}` }]} />
      </PageHero>
      <section className="container-x py-16 md:py-24">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <li key={t.slug}><TourCard tour={t} tags={styleLabels(t)} /></li>
          ))}
        </ul>
        <div className="mt-16 border-t border-ink/15 pt-10">
          <p className="display text-3xl">Starting somewhere else?</p>
          <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {others.map((o) => (
              <Link key={o} href={cityPath(o)} className="underline decoration-gold underline-offset-4 hover:text-terracotta">Tours from {o}</Link>
            ))}
            <Link href="/tours" className="underline decoration-gold underline-offset-4 hover:text-terracotta">All tours</Link>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">Plan my trip</Link>
          </div>
        </div>
      </section>
    </>
  );
}
