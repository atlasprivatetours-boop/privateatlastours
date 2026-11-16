import { dayTrips, posts, tours } from "./content";

// Every fact below is taken from the existing atlasprivatetours.com tour, day-trip and blog copy.
export type Destination = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  intro: string;
  see: string[];
  hero: string;
  heroAlt: string;
  /** Matches tour itinerary titles/text that visit this place. */
  match: RegExp;
  tripSlugs: string[];
  postSlugs: string[];
  seoDescription: string;
  /** Visible questions and answers, also published as FAQ structured data. Only answers the site already gives. */
  faqs?: { q: string; a: string }[];
};

const img = (n: string) => `/images/2017-12-atlas-private-tours-${n}`;

export const destinations: Destination[] = [
  {
    slug: "marrakech",
    name: "Marrakech",
    region: "Imperial city",
    tagline: "The Red City, and the gateway to the High Atlas",
    intro:
      "Marrakech is the starting point for many of our private journeys. From the city you can head over the High Atlas via the Tizi n’Tichka pass towards Ait Ben Haddou and the Sahara, or spend a day in the Ourika Valley and the Atlas villages.",
    see: [
      "Guided city tour including Djemaa el-Fna, Bahia Palace and the Saadian Tombs",
      "Koutoubia Mosque",
      "Day trip to the Ourika Valley and its Berber villages",
      "Day trip to the Atlas Mountains, with mint tea in a Berber home",
    ],
    hero: img("76.jpg"),
    heroAlt: "Reflecting pool and minaret in Marrakech",
    match: /marrakech|marrakesh/i,
    tripSlugs: ["marrakech", "ourika-valley", "atlas-mountains", "essaouira", "ouzoud-waterfalls"],
    postSlugs: ["walk-in-marrakech-as-a-local", "moroccan-cuisine-in-marrakech", "hot-air-balloon-marrakech", "fes-vs-marrakech"],
    seoDescription: "Private tours and day trips from Marrakech: Sahara desert journeys, Ait Ben Haddou, Ourika Valley and the Atlas Mountains with local guides.",
  },
  {
    slug: "fes",
    name: "Fes",
    region: "Imperial city",
    tagline: "Morocco’s spiritual capital and our home town",
    intro:
      "Atlas Private Tours is based in Fes. The old medina, the Royal Palace, the Mellah and the Bab Boujloud entrance anchor our imperial-city itineraries, and the city is also where many of our Sahara routes begin, through the Middle Atlas towards Merzouga.",
    see: [
      "The old medina (el-Bali) and its 17th-century madrasa",
      "Royal Palace, the Mellah (Jewish quarter) and Bab Boujloud",
      "Mausoleum of Moulay Idris",
      "Day trips to Meknes and the Roman ruins of Volubilis",
    ],
    hero: img("44.jpg"),
    heroAlt: "Carved courtyard of a historic madrasa in Fes",
    match: /\bfes\b|\bfez\b/i,
    tripSlugs: ["meknes", "volubilis"],
    postSlugs: ["medina-of-fez-travel-guide", "fes-vs-marrakech", "the-excitements-that-you-can-find-in-fez"],
    seoDescription: "Private tours from Fes, our home city: imperial cities, Volubilis, Meknes and Sahara journeys to Merzouga with local Berber guides.",
  },
  {
    slug: "casablanca",
    name: "Casablanca",
    region: "Atlantic coast",
    tagline: "Where our longer imperial-city tours begin",
    intro:
      "Casablanca is the departure city for several of our longer tours, which continue to Rabat, Chefchaouen, Fes, the Sahara and Marrakech. The journey opens with one of the largest mosques in the world, beside the Atlantic Ocean.",
    see: [
      "The Hassan II Mosque on the Atlantic shore",
      "Rabat, Morocco’s capital, and its monuments",
      "Onward routes to Chefchaouen, Volubilis and Fes",
    ],
    hero: img("18.jpeg"),
    heroAlt: "The Hassan II Mosque in Casablanca",
    match: /casablanca/i,
    tripSlugs: [],
    postSlugs: ["why-you-should-visit-casablanca-morocco", "morocco-atlantic-beaches-road-trip", "top-5-beaches-in-morocco"],
    seoDescription: "Private tours from Casablanca: 7 to 10 day journeys through Rabat, Chefchaouen, Fes, the Sahara and Marrakech with a private driver-guide.",
  },
  {
    slug: "merzouga-sahara",
    name: "Merzouga & the Sahara",
    region: "Erg Chebbi dunes",
    tagline: "Camel treks, dune sunrises and a night in a desert camp",
    intro:
      "Our owner, guides and drivers grew up in the Sahara, and Merzouga and the Erg Chebbi dunes are at the heart of what we do. Most of our tours include a camel trek into the dunes and a night in a traditional desert camp, with a sunrise over the sand the next morning.",
    see: [
      "Camel trek across the Erg Chebbi dunes at sunset and sunrise",
      "Overnight stay in a desert camp, with drumming around the fire",
      "Khamlia village, known for its Gnawa music",
      "Rissani, with the largest traditional souk in the south",
      "Erfoud, the “capital of fossils”",
    ],
    hero: img("13.jpeg"),
    heroAlt: "Camel caravan shadows across the Merzouga dunes",
    match: /merzouga|sahara|erg chebbi/i,
    faqs: [
      { q: "How long is the camel ride to the desert camp in Merzouga?", a: "Usually between 1 and 1.5 hours each way, depending on your camp’s location in the dunes." },
      { q: "Can I stay in a desert camp without riding a camel?", a: "Yes. Travellers who prefer not to ride camels can request a 4x4 transfer to the camp." },
      { q: "When is the best time of year for a Sahara desert camp?", a: "Spring (March to May) and autumn (September to November) offer the most pleasant weather. Summer can be very hot in the desert, while winter nights can be cold." },
    ],
    tripSlugs: ["morocco-desert"],
    postSlugs: ["sahara-desert-trip-guide", "sahara-desert-camp-experience", "marrakech-to-merzouga-road-trip"],
    seoDescription: "Private Sahara desert tours to Merzouga and Erg Chebbi: camel treks, desert camp nights and sunrise over the dunes, led by a local Berber family.",
  },
  {
    slug: "ouarzazate-ait-ben-haddou",
    name: "Ouarzazate & Ait Ben Haddou",
    region: "South of the High Atlas",
    tagline: "Kasbahs, gorges and film-set landscapes",
    intro:
      "On the road between Marrakech and the desert, Ouarzazate and Ait Ben Haddou are regular stops on our itineraries, together with the Dades and Todra gorges and the Valley of the Roses.",
    see: [
      "Ait Ben Haddou, a UNESCO World Heritage kasbah used as a film location",
      "Kasbah Taourirt and the Ouarzazate film studios (when open)",
      "Dades Valley and the Todra Gorges",
      "The Valley of the Roses and El Kelaa M’Gouna",
      "The Tizi n’Tichka pass (2,260 m) over the High Atlas",
    ],
    hero: img("79.jpg"),
    heroAlt: "Ait Ben Haddou kasbah",
    match: /ouarzazate|ait\s?ben\s?haddou|aitbenhaddou|dades|todra/i,
    tripSlugs: ["ouarzazate"],
    postSlugs: ["ouarzazate-travel-guide", "discover-the-magic-of-rose-valley-mgouna"],
    seoDescription: "Private tours through Ouarzazate and Ait Ben Haddou, with the Dades and Todra gorges, on routes between Marrakech, Fes and the Sahara.",
  },
  {
    slug: "essaouira",
    name: "Essaouira",
    region: "Atlantic coast",
    tagline: "A walled Atlantic medina, three hours from Marrakech",
    intro:
      "Essaouira is a relaxed UNESCO World Heritage town about three hours from Marrakech. A private day trip leaves time for the monuments, the old fish market and the seaport.",
    see: [
      "The ramparts and 16th-century walled city, with views over the Atlantic",
      "The old fish markets and the seaport",
      "Silver craftsmen and wood carvers at work",
    ],
    hero: img("80.jpg"),
    heroAlt: "Fishing boats in the port of Essaouira",
    match: /essaouira/i,
    tripSlugs: ["essaouira"],
    postSlugs: ["morocco-atlantic-beaches-road-trip", "surfing-in-morocco-best-beaches-and-camps"],
    seoDescription: "Private day trip to Essaouira from Marrakech: the walled medina, ramparts, fish market and seaport with a local driver-guide.",
  },
  {
    slug: "atlas-mountains",
    name: "Atlas Mountains",
    region: "High Atlas",
    tagline: "Berber villages, valleys and waterfalls close to Marrakech",
    intro:
      "The Atlas Mountains are an easy escape from Marrakech. Our day trips cover Asni and the surrounding Berber villages, the Ourika Valley (30 km from the city) and the Ouzoud Waterfalls, which fall from more than 100 metres.",
    see: [
      "Asni and Berber villages, with mint tea in a local home",
      "Ourika Valley, its waterfalls and green gardens",
      "Ouzoud Waterfalls, home to Barbary apes",
      "Crossing the High Atlas by the Tizi n’Tichka pass",
    ],
    hero: img("28.jpg"),
    heroAlt: "Valley in the Atlas Mountains",
    match: /atlas mountains|high atlas|tizi/i,
    tripSlugs: ["atlas-mountains", "ourika-valley", "ouzoud-waterfalls"],
    postSlugs: ["adventure-travel-in-morocco", "national-parks-in-morocco", "akchour-waterfalls-hike-guide"],
    seoDescription: "Private Atlas Mountains day trips from Marrakech: Asni, the Ourika Valley and Ouzoud Waterfalls with a local driver-guide.",
  },
  {
    slug: "chefchaouen",
    name: "Chefchaouen",
    region: "Rif Mountains",
    tagline: "A blue mountain town on the way to Fes",
    intro:
      "On our longer tours from Casablanca, Chefchaouen is a relaxed morning stop: winding alleys, traditional artisan shops and mountain scenery, before continuing south to Volubilis and Fes.",
    see: ["Strolling the winding alleys and artisan shops", "Onward to the Roman site of Volubilis"],
    hero: img("66.jpg"),
    heroAlt: "Blue-painted steps in Chefchaouen",
    match: /chefchaouen/i,
    tripSlugs: ["volubilis"],
    postSlugs: ["top-5-must-visit-cities-in-morocco", "akchour-waterfalls-hike-guide"],
    seoDescription: "Visit Chefchaouen on a private Morocco tour from Casablanca, with Rabat, Volubilis and Fes on the same journey.",
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);

export function destinationContent(d: Destination) {
  return {
    tours: tours.filter((t) => t.itinerary.some((i) => d.match.test(`${i.title} ${i.text}`)) || d.match.test(t.name)),
    trips: d.tripSlugs.map((s) => dayTrips.find((t) => t.slug === s)).filter((t): t is NonNullable<typeof t> => !!t),
    posts: d.postSlugs.map((s) => posts.find((p) => p.slug === s)).filter((p): p is NonNullable<typeof p> => !!p),
  };
}
