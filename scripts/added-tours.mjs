// Added tours: ten for Marrakech, Fes and Casablanca, the Errachidia departures and six from Tangier.
// Only entries with `live: true` are published; the rest are drafts, hidden until approved.
// Routes follow itineraries already on atlasprivatetours.com (same stops, same style of days);
// the wording is new. No prices, no hotel names, no claims beyond the site's own include lists.
// Run: node scripts/added-tours.mjs  -> writes src/content/tours-added.json
import fs from "node:fs";

const I = (f) => `/images/${f}`;

const BASE_INC = [
  "Private air-conditioned transportation with a professional driver throughout the tour",
  "Licensed local guides for the city visits",
  "Accommodation in quality hotels and riads",
  "Daily breakfast at all accommodations",
  "Airport transfers on arrival and departure days",
  "Assistance 24/7 from the tour operator team throughout the trip",
];
const DESERT_INC = [
  "Private air-conditioned transportation with a professional driver throughout the tour",
  "Licensed local guides for the city visits",
  "Accommodation in quality hotels, riads, and a desert camp in Merzouga (private tent)",
  "Daily breakfast at all accommodations",
  "Camel trek into the Sahara Desert with a sunset/sunrise experience",
  "Airport transfers on arrival and departure days",
  "Assistance 24/7 from the tour operator team throughout the trip",
];
// Errachidia departures: no city guide on the desert-only tours, and no airport promise (arrival by hotel or station).
const ERR_INC = [
  "Private air-conditioned transportation with a professional driver throughout the tour",
  "Accommodation in quality hotels and a desert camp in Merzouga (private tent)",
  "Daily breakfast at all accommodations",
  "Camel trek into the Sahara Desert with a sunset/sunrise experience",
  "Transfers on arrival and departure days",
  "Assistance 24/7 from the tour operator team throughout the trip",
];
const ERR_FES_INC = [ERR_INC[0], "Licensed local guides for the city visits", ...ERR_INC.slice(1)];
const INC = { ERR: ERR_INC, ERR_FES: ERR_FES_INC };
const EXC = [
  "International or domestic flights",
  "Travel insurance (strongly recommended)",
  "Lunches and dinners not specified in the itinerary",
  "Personal expenses (souvenirs, laundry, snacks, etc.)",
  "Tips for guides, drivers, and hotel staff (at your discretion)",
  "Optional activities not listed (e.g. quad biking, hammam & spa experiences)",
];
const CUSTOM = "Every Atlas Private Tours journey is private and can be adjusted to your dates, pace and interests. Contact us to change this itinerary.";

const defs = [
  // ---------------- Marrakech (+1) ----------------
  {
    slug: "7-days-from-marrakech-to-chefchaouen-via-sahara-and-fes",
    name: "7 Days from Marrakech to Chefchaouen via the Sahara and Fes",
    origin: "Marrakech", desert: true, hero: "2025-09-chef.jpg",
    images: ["2017-12-ait-benhaddou.jpg", "2017-12-camel-trekking.jpg", "2025-05-fes.jpg", "2025-07-chefchaoun.jpg"],
    overview: "Cross Morocco from the red city of Marrakech to the blue lanes of Chefchaouen. Over seven days you cross the High Atlas, spend a night in the Sahara at Merzouga, walk the medina of Fes and finish in the Rif Mountains. It is the south-to-north route in one unhurried journey, with a private driver and licensed local guides.",
    highlights: ["Cross the High Atlas by the Tizi n’Tichka pass", "Guided visit to the kasbah of Ait Ben Haddou, a UNESCO World Heritage Site", "Todra Gorges and the Dades Valley", "Camel trek and a night in a desert camp at Erg Chebbi", "Guided exploration of the Fes medina", "Roman ruins of Volubilis", "Wander the blue streets of Chefchaouen"],
    days: [
      ["Marrakech / Ait Ben Haddou / Ouarzazate", "After meeting your driver in Marrakech, climb into the High Atlas over the Tizi n’Tichka pass. Visit the kasbah of Ait Ben Haddou with a local guide, then continue to Ouarzazate for the night."],
      ["Ouarzazate / Dades Valley / Todra Gorges / Merzouga", "Drive east through the Dades Valley and the Todra Gorges, with stops for photographs and lunch. In the late afternoon reach the Sahara at Merzouga, ride a camel into the dunes at sunset and spend the night in a desert camp."],
      ["Merzouga / Midelt / Fes", "Watch the sunrise over the Erg Chebbi dunes, then begin the long drive north through the Ziz Valley, Midelt and the cedar forests of the Middle Atlas to Fes."],
      ["Fes", "A full day with a licensed guide in the old medina: Bab Boujloud, the Qarawiyyin quarter, the medersas, the tanneries and the souks."],
      ["Fes / Meknes / Volubilis / Chefchaouen", "Leave Fes for the imperial city of Meknes, then visit the Roman ruins of Volubilis and continue north into the Rif Mountains to Chefchaouen."],
      ["Chefchaouen", "A free day in the blue city. Walk the medina, climb to the Spanish Mosque viewpoint, or ask us to arrange a morning in the nearby mountains."],
      ["Chefchaouen departure", "Breakfast, then your driver takes you to your onward destination or airport. Contact us beforehand if you would like a different ending point."],
    ],
  },

  // ---------------- Fes (+4) ----------------
  {
    slug: "3-days-from-fes-chefchaouen-volubilis-and-meknes",
    live: true,
    name: "3 Days from Fes to Chefchaouen, Volubilis and Meknes",
    origin: "Fes", desert: false, hero: "2025-06-chechaoun.jpg",
    images: ["2025-05-chefchaouine.jpg", "2017-12-volubilis.jpg", "2017-12-meknes.jpg", "2017-12-fes-1.jpg"],
    overview: "A short northern loop that starts and ends in Fes. You visit imperial Meknes and the Roman city of Volubilis, spend a night in the blue city of Chefchaouen and return to Fes through the hills of the Rif. It suits travellers who want culture and scenery without the long desert drives.",
    highlights: ["Imperial city of Meknes", "Roman ruins of Volubilis, a UNESCO World Heritage Site", "A night in Chefchaouen, the blue city of the Rif", "Free time to walk the medina and its viewpoints", "Return to Fes through the northern countryside"],
    days: [
      ["Fes / Meknes / Volubilis / Chefchaouen", "Leave Fes after breakfast and drive to Meknes to see its gates and old quarter. Continue to Volubilis for a guided visit of the Roman ruins, then go north through the Rif to Chefchaouen for the night."],
      ["Chefchaouen", "Spend the day in the blue city. Your driver can take you up to the viewpoint above town, and you are free to explore the medina and its small squares at your own pace."],
      ["Chefchaouen / Fes", "Return to Fes by the scenic route. Your driver drops you at your hotel, or at the station or airport if you are moving on."],
    ],
  },
  {
    slug: "4-days-from-fes-to-casablanca-via-chefchaouen-and-rabat",
    name: "4 Days from Fes to Casablanca via Chefchaouen and Rabat",
    origin: "Fes", desert: false, hero: "2017-12-rabat.jpg",
    images: ["2025-07-chefchaoun.jpg", "2025-05-rabat.jpg", "2018-07-hassan-ii-mosque-casablanca-morocco.jpg", "2025-07-bab-boujloud-1.jpg"],
    overview: "A north-to-coast journey from Fes to Casablanca. You visit the medina of Fes, the blue city of Chefchaouen and the capital Rabat before ending at the Hassan II Mosque in Casablanca. It is a good way to see the north of Morocco on a short trip.",
    highlights: ["Guided visit to the Fes medina", "Chefchaouen, the blue city", "Rabat: Kasbah of the Udayas and the Hassan Tower", "Hassan II Mosque in Casablanca"],
    days: [
      ["Fes / Chefchaouen", "Start with a guided walk through the Fes medina, then drive north through the countryside of the Rif to Chefchaouen for the night."],
      ["Chefchaouen", "A free day in Chefchaouen to wander the blue lanes, take photographs and enjoy the mountain views."],
      ["Chefchaouen / Rabat", "Head towards the Atlantic coast to Rabat. In the afternoon visit the Kasbah of the Udayas and the Hassan Tower."],
      ["Rabat / Casablanca", "Drive to Casablanca and visit the Hassan II Mosque. Your driver then takes you to your hotel, the airport or the station."],
    ],
  },
  {
    slug: "6-days-from-fes-to-marrakech-via-chefchaouen-and-sahara",
    live: true,
    name: "6 Days from Fes to Marrakech via Chefchaouen and the Sahara",
    origin: "Fes", desert: true, hero: "2025-07-fes-bg-1.jpg",
    images: ["2025-06-chechaoun.jpg", "2017-12-merzouga-camp.jpg", "2017-12-dades-gorge.jpg", "2017-12-marrakech.jpg"],
    overview: "Six days that combine the blue city, the old medina of Fes, a night in the Sahara and an arrival in Marrakech. You begin in the north, turn south through the Middle Atlas to the dunes of Merzouga and cross the High Atlas to finish in the red city.",
    highlights: ["Chefchaouen in the Rif Mountains", "Guided visit to the Fes medina", "Middle Atlas and the Ziz Valley", "Camel trek and a night in a desert camp", "Todra Gorges and Ait Ben Haddou", "A full day in Marrakech"],
    days: [
      ["Fes / Chefchaouen", "Leave Fes and drive north to Chefchaouen. Spend the afternoon in the medina and the evening at a rooftop or in the main square."],
      ["Chefchaouen / Fes", "Return to Fes for a guided visit of the old medina, its medersas and the tanneries."],
      ["Fes / Merzouga", "A long and scenic drive south through the Middle Atlas cedar forests, Midelt and the Ziz Valley to the Sahara. Ride a camel at sunset and spend the night in the desert camp."],
      ["Merzouga / Todra Gorges / Ouarzazate", "Sunrise over the dunes, then drive west through the Todra Gorges and the Dades Valley to Ouarzazate."],
      ["Ouarzazate / Ait Ben Haddou / Marrakech", "Visit the kasbah of Ait Ben Haddou, then cross the High Atlas by the Tizi n’Tichka pass to Marrakech."],
      ["Marrakech", "A final day in Marrakech: Bahia Palace, the Saadian Tombs, Koutoubia Mosque and the Jemaa el-Fna square. Your driver takes you to the airport or station when you are ready."],
    ],
  },
  {
    slug: "8-days-from-fes-to-casablanca-via-sahara-marrakech-and-essaouira",
    name: "8 Days from Fes to Casablanca via the Sahara, Marrakech and Essaouira",
    origin: "Fes", desert: true, hero: "2025-09-fes.jpg",
    images: ["2017-12-fes.jpg", "2019-11-merzouga.jpg", "2017-12-marrakech-menara.jpg", "2017-12-essaouira.jpg"],
    overview: "A grand loop from the imperial city of Fes to the Atlantic coast. You spend a night in the Sahara, cross the High Atlas to Marrakech, continue to the wind-swept port of Essaouira and finish in Casablanca. It covers the desert, the kasbahs, two imperial cities and the sea in eight days.",
    highlights: ["Guided visit to the Fes medina", "Camel trek and a night in a desert camp at Merzouga", "Todra Gorges and the Dades Valley", "Kasbah of Ait Ben Haddou", "Marrakech medina and Jemaa el-Fna", "Essaouira’s ramparts and fishing port", "Hassan II Mosque in Casablanca"],
    days: [
      ["Fes", "Meet your guide in Fes and explore the old medina, Bab Boujloud, the medersas and the tanneries."],
      ["Fes / Merzouga", "Drive through the Middle Atlas, Midelt and the Ziz Valley to the Sahara. Ride a camel into the dunes for sunset and spend the night in a desert camp."],
      ["Merzouga / Todra Gorges / Ouarzazate", "Watch the sunrise, then drive west through the Todra Gorges and the Dades Valley to Ouarzazate."],
      ["Ouarzazate / Ait Ben Haddou / Marrakech", "Visit the kasbah of Ait Ben Haddou, then cross the High Atlas by the Tizi n’Tichka pass to Marrakech."],
      ["Marrakech", "A guided day in Marrakech: Bahia Palace, the Saadian Tombs, Koutoubia Mosque, the souks and Jemaa el-Fna."],
      ["Marrakech / Essaouira", "Drive west to the Atlantic coast. Walk the ramparts, the medina and the fishing port of Essaouira."],
      ["Essaouira", "A free day in Essaouira: the beach, the harbour, the arts and crafts of the medina, and fresh seafood."],
      ["Essaouira / Casablanca", "Follow the coast to Casablanca and visit the Hassan II Mosque before your onward journey."],
    ],
  },

  // ---------------- Casablanca (+5) ----------------
  {
    slug: "3-days-from-casablanca-to-fes-via-rabat-and-meknes",
    live: true,
    name: "3 Days from Casablanca to Fes via Rabat and Meknes",
    origin: "Casablanca", desert: false, hero: "2025-09-casa.jpg",
    images: ["2018-07-hassan-ii-mosque-casablanca-morocco.jpg", "2025-05-rabat.jpg", "2017-12-meknes.jpg", "2017-12-fes.jpg"],
    overview: "A short introduction to the imperial cities. You start in Casablanca, visit the capital Rabat, stop at Meknes and spend a full day in Fes. The Roman ruins of Volubilis can be added on the last day. It is a compact route for travellers with limited time.",
    highlights: ["Hassan II Mosque in Casablanca", "Rabat: Kasbah of the Udayas and the Hassan Tower", "Imperial city of Meknes", "Guided visit to the Fes medina", "Volubilis available as an optional extra"],
    days: [
      ["Casablanca / Rabat / Meknes / Fes", "Visit the Hassan II Mosque, then drive to Rabat for the Kasbah of the Udayas and the Hassan Tower. Continue to Meknes and on to Fes for the night."],
      ["Fes", "A full day with a licensed guide in the Fes medina: Bab Boujloud, the Qarawiyyin quarter, medersas, tanneries and souks."],
      ["Fes departure", "Your driver takes you to the airport, station or onward destination. If your departure is later in the day, the Roman ruins of Volubilis can be added as a half-day extension. Just ask us."],
    ],
  },
  {
    slug: "4-days-from-casablanca-to-marrakech-via-essaouira",
    live: true,
    name: "4 Days from Casablanca to Marrakech via Essaouira",
    origin: "Casablanca", desert: false, hero: "2025-09-essa.jpg",
    images: ["2017-12-essaouira.jpg", "2025-07-essaouira-beach.jpg", "2017-12-marrakech.jpg", "2018-07-hassan-ii-mosque-casablanca-morocco.jpg"],
    overview: "Four days on the Atlantic side of Morocco: Casablanca, the port of Essaouira and the red city of Marrakech. It suits travellers who prefer the coast, markets and medinas to the long desert drives.",
    highlights: ["Hassan II Mosque in Casablanca", "Atlantic coast drive", "Essaouira’s ramparts, port and medina", "Marrakech medina and Jemaa el-Fna"],
    days: [
      ["Casablanca / Essaouira", "Visit the Hassan II Mosque, then follow the Atlantic coast south to Essaouira for the night."],
      ["Essaouira", "A free day in Essaouira: the harbour, the ramparts, the medina and the beach."],
      ["Essaouira / Marrakech", "Drive inland to Marrakech and spend the afternoon in the medina and Jemaa el-Fna."],
      ["Marrakech", "A guided day: Bahia Palace, the Saadian Tombs, Koutoubia Mosque and the souks. Airport or station transfer when you are ready."],
    ],
  },
  {
    slug: "5-days-from-casablanca-to-marrakech-via-fes-and-sahara",
    live: true,
    name: "5 Days from Casablanca to Marrakech via Fes and the Sahara",
    origin: "Casablanca", desert: true, hero: "2025-09-deset-1024x682.jpg",
    images: ["2025-05-rabat.jpg", "2017-12-fes-1.jpg", "2017-12-merzouga-camp.jpg", "2017-12-ait-benhaddou.jpg"],
    overview: "Five days from the Atlantic coast to the Sahara and back to the red city. You cross to Fes by way of Rabat and Meknes, travel south to the dunes of Merzouga for a night in the desert, and cross the High Atlas to Marrakech.",
    highlights: ["Rabat and Meknes on the way to Fes", "An evening in Fes", "Camel trek and a night in a desert camp", "Todra Gorges and the Dades Valley", "Ait Ben Haddou and the High Atlas", "Marrakech"],
    days: [
      ["Casablanca / Rabat / Meknes / Fes", "Visit the Hassan II Mosque, then head to Rabat and Meknes before arriving in Fes in the evening."],
      ["Fes / Merzouga", "Drive south through the Middle Atlas and the Ziz Valley to the Sahara. Ride a camel into the dunes and spend the night in the desert camp."],
      ["Merzouga / Todra Gorges / Ouarzazate", "Sunrise over the dunes, then drive through the Todra Gorges and the Dades Valley to Ouarzazate."],
      ["Ouarzazate / Ait Ben Haddou / Marrakech", "Visit Ait Ben Haddou and cross the High Atlas over the Tizi n’Tichka pass to Marrakech."],
      ["Marrakech", "A free day in Marrakech, with an optional guided visit to the medina. Transfer to the airport or station when you are ready."],
    ],
  },
  {
    slug: "6-days-from-casablanca-to-marrakech-via-essaouira-and-sahara",
    name: "6 Days from Casablanca to Marrakech via Essaouira and the Sahara",
    origin: "Casablanca", desert: true, hero: "2017-12-desert-bg.jpg",
    images: ["2017-12-essaouira.jpg", "2017-12-marrakech.jpg", "2019-11-merzouga.jpg", "2017-12-ait-benhaddou.jpg"],
    overview: "The sea, the red city and the Sahara in six days. You follow the Atlantic coast to Essaouira, spend a day in Marrakech, then cross the High Atlas to the dunes of Merzouga before returning to Marrakech.",
    highlights: ["Hassan II Mosque in Casablanca", "Essaouira on the Atlantic coast", "Marrakech medina", "Ait Ben Haddou and the Tizi n’Tichka pass", "Camel trek and a night in a desert camp at Merzouga"],
    days: [
      ["Casablanca / Essaouira", "Visit the Hassan II Mosque, then follow the coast south to Essaouira."],
      ["Essaouira / Marrakech", "Spend the morning in Essaouira’s port and medina, then drive inland to Marrakech."],
      ["Marrakech / Ait Ben Haddou / Ouarzazate", "Cross the High Atlas by the Tizi n’Tichka pass, visit Ait Ben Haddou and stay in Ouarzazate."],
      ["Ouarzazate / Dades Valley / Todra Gorges / Merzouga", "Drive east through the Dades Valley and the Todra Gorges to the Sahara. Ride a camel at sunset and spend the night in the desert camp."],
      ["Merzouga / Ouarzazate", "Sunrise over the dunes, then a long return drive west to Ouarzazate."],
      ["Ouarzazate / Marrakech", "Return to Marrakech over the High Atlas. Transfer to the airport or station on arrival."],
    ],
  },
  {
    slug: "8-days-from-casablanca-via-chefchaouen-sahara-and-essaouira",
    name: "8 Days from Casablanca via Chefchaouen, the Sahara and Essaouira",
    origin: "Casablanca", desert: true, hero: "2025-09-chef.jpg",
    images: ["2025-07-chefchaoun.jpg", "2017-12-fes-1.jpg", "2017-12-merzouga-camp.jpg", "2017-12-essaouira.jpg"],
    overview: "A round trip that begins and ends in Casablanca. You travel north to the blue city of Chefchaouen, visit Fes, spend a night in the Sahara, cross the High Atlas to Marrakech and return along the coast through Essaouira.",
    highlights: ["Chefchaouen in the Rif Mountains", "Roman ruins of Volubilis", "Guided visit to the Fes medina", "Camel trek and a night in a desert camp", "Ait Ben Haddou", "Marrakech and Essaouira"],
    days: [
      ["Casablanca / Rabat / Chefchaouen", "Leave Casablanca for Rabat, then continue north into the Rif Mountains to Chefchaouen."],
      ["Chefchaouen / Volubilis / Fes", "Walk the blue lanes in the morning, then drive to the Roman ruins of Volubilis and on to Fes."],
      ["Fes", "A guided day in the Fes medina: Bab Boujloud, medersas, tanneries and souks."],
      ["Fes / Merzouga", "Drive through the Middle Atlas and the Ziz Valley to the Sahara. Camel ride at sunset and a night in the desert camp."],
      ["Merzouga / Todra Gorges / Ouarzazate", "Sunrise on the dunes, then the Todra Gorges and the Dades Valley to Ouarzazate."],
      ["Ouarzazate / Ait Ben Haddou / Marrakech", "Visit Ait Ben Haddou and cross the High Atlas by the Tizi n’Tichka pass to Marrakech."],
      ["Marrakech / Essaouira", "A morning in Marrakech, then drive west to Essaouira for the evening."],
      ["Essaouira / Casablanca", "Follow the Atlantic coast back to Casablanca. Airport or hotel transfer on arrival."],
    ],
  },

  // ---------------- Tangier (new departure city, six drafts) ----------------
  // Stops are the ones already used by the existing tours. Driving times are not stated; the owner must confirm routes and overnights.
  {
    slug: "3-days-from-tangier-to-fes-via-chefchaouen-and-meknes",
    live: true,
    name: "3 Days from Tangier to Fes via Chefchaouen and Meknes",
    origin: "Tangier", desert: false, hero: "2025-07-tanger-.jpg",
    images: ["2025-07-chefchaoun.jpg", "2017-12-volubilis.jpg", "2017-12-meknes.jpg", "2017-12-fes-1.jpg"],
    overview: "A short route from the northern port city to the imperial city of Fes. You spend a night in the blue city of Chefchaouen, visit the Roman ruins of Volubilis and Meknes, and finish with a guided day in the Fes medina.",
    highlights: ["Chefchaouen, the blue city of the Rif", "Roman ruins of Volubilis, a UNESCO World Heritage Site", "Imperial city of Meknes", "Guided visit to the Fes medina"],
    days: [
      ["Tangier / Chefchaouen", "Meet your driver in Tangier and drive south into the Rif Mountains to Chefchaouen. Spend the afternoon in the blue medina."],
      ["Chefchaouen / Volubilis / Meknes / Fes", "Leave Chefchaouen for the Roman ruins of Volubilis, then stop in Meknes before arriving in Fes for the night."],
      ["Fes", "A full day with a licensed guide in the old medina: Bab Boujloud, the Qarawiyyin quarter, the medersas, the tanneries and the souks. Your driver then takes you to the airport, station or onward destination."],
    ],
  },
  {
    slug: "4-days-from-tangier-to-casablanca-via-chefchaouen-and-rabat",
    live: true,
    name: "4 Days from Tangier to Casablanca via Chefchaouen and Rabat",
    origin: "Tangier", desert: false, hero: "2019-11-asilah2.jpg",
    images: ["2025-06-chechaoun.jpg", "2025-05-rabat.jpg", "2017-12-rabat.jpg", "2018-07-hassan-ii-mosque-casablanca-morocco.jpg"],
    overview: "A northern route from Tangier to the Atlantic coast. You spend two nights around the blue city of Chefchaouen, then continue to the capital Rabat and finish at the Hassan II Mosque in Casablanca.",
    highlights: ["Chefchaouen in the Rif Mountains", "Rabat: Kasbah of the Udayas and the Hassan Tower", "Hassan II Mosque in Casablanca"],
    days: [
      ["Tangier / Chefchaouen", "Meet your driver in Tangier and drive south into the Rif Mountains to Chefchaouen for the night."],
      ["Chefchaouen", "A free day in the blue city to wander the lanes, take photographs and enjoy the mountain views."],
      ["Chefchaouen / Rabat", "Head towards the Atlantic coast to Rabat. In the afternoon visit the Kasbah of the Udayas and the Hassan Tower."],
      ["Rabat / Casablanca", "Drive to Casablanca and visit the Hassan II Mosque. Your driver then takes you to your hotel, the airport or the station."],
    ],
  },
  {
    slug: "5-days-from-tangier-to-marrakech-via-fes-and-sahara",
    live: true,
    name: "5 Days from Tangier to Marrakech via Fes and the Sahara",
    origin: "Tangier", desert: true, hero: "2025-09-chef.jpg",
    images: ["2025-07-chefchaoun.jpg", "2017-12-fes-1.jpg", "2017-12-merzouga-camp.jpg", "2017-12-ait-benhaddou.jpg"],
    overview: "The north, the Sahara and the red city in five days. You cross from Tangier to Chefchaouen and Fes, travel south to the dunes of Merzouga for a night in the desert, and cross the High Atlas to Marrakech.",
    highlights: ["Chefchaouen in the Rif Mountains", "Roman ruins of Volubilis and the imperial city of Meknes", "Camel trek and a night in a desert camp", "Ait Ben Haddou and the High Atlas", "Marrakech"],
    days: [
      ["Tangier / Chefchaouen", "Meet your driver in Tangier and drive south into the Rif Mountains to Chefchaouen. Spend the afternoon in the medina."],
      ["Chefchaouen / Volubilis / Meknes / Fes", "Visit the Roman ruins of Volubilis and stop in Meknes before arriving in Fes for the night."],
      ["Fes / Merzouga", "Drive south through the Middle Atlas and the Ziz Valley to the Sahara. Ride a camel into the dunes at sunset and spend the night in the desert camp."],
      ["Merzouga / Todra Gorges / Ouarzazate", "Sunrise over the dunes, then drive west through the Todra Gorges and the Dades Valley to Ouarzazate."],
      ["Ouarzazate / Ait Ben Haddou / Marrakech", "Visit the kasbah of Ait Ben Haddou and cross the High Atlas by the Tizi n’Tichka pass to Marrakech. Transfer to the airport or station on arrival."],
    ],
  },
  {
    slug: "6-days-from-tangier-to-marrakech-via-chefchaouen-fes-and-sahara",
    live: true,
    name: "6 Days from Tangier to Marrakech via Chefchaouen, Fes and the Sahara",
    origin: "Tangier", desert: true, hero: "2025-07-tanger-.jpg",
    images: ["2025-06-chechaoun.jpg", "2025-09-fes.jpg", "2019-11-merzouga.jpg", "2017-12-marrakech.jpg"],
    overview: "Six days from Tangier to Marrakech with a full day in the Fes medina. You visit Chefchaouen, Volubilis and Meknes, spend a night in the Sahara at Merzouga, and finish in the red city after crossing the High Atlas.",
    highlights: ["Chefchaouen in the Rif Mountains", "Volubilis and Meknes", "Guided visit to the Fes medina", "Camel trek and a night in a desert camp", "Todra Gorges and Ait Ben Haddou", "Marrakech"],
    days: [
      ["Tangier / Chefchaouen", "Meet your driver in Tangier and drive south into the Rif Mountains to Chefchaouen for the night."],
      ["Chefchaouen / Volubilis / Meknes / Fes", "Visit the Roman ruins of Volubilis and stop in Meknes before arriving in Fes."],
      ["Fes", "A full day with a licensed guide in the old medina: Bab Boujloud, the medersas, the tanneries and the souks."],
      ["Fes / Merzouga", "Drive south through the Middle Atlas cedar forests, Midelt and the Ziz Valley to the Sahara. Ride a camel at sunset and spend the night in the desert camp."],
      ["Merzouga / Todra Gorges / Ouarzazate", "Sunrise over the dunes, then the Todra Gorges and the Dades Valley to Ouarzazate."],
      ["Ouarzazate / Ait Ben Haddou / Marrakech", "Visit Ait Ben Haddou and cross the High Atlas by the Tizi n’Tichka pass to Marrakech. Transfer to the airport or station when you arrive."],
    ],
  },
  {
    slug: "7-days-from-tangier-to-marrakech-via-chefchaouen-sahara-and-fes",
    live: true,
    name: "7 Days from Tangier to Marrakech via Chefchaouen, the Sahara and Fes",
    origin: "Tangier", desert: true, hero: "2025-09-chef.jpg",
    images: ["2025-05-chefchaouine.jpg", "2017-12-fes.jpg", "2017-12-camel-trekking.jpg", "2017-12-marrakech-menara.jpg"],
    overview: "A relaxed seven-day route from Tangier to Marrakech. You take a free day in Chefchaouen, spend a full day in Fes, sleep in the Sahara at Merzouga and have a day left to explore Marrakech.",
    highlights: ["A free day in Chefchaouen", "Guided visit to the Fes medina", "Camel trek and a night in a desert camp", "Todra Gorges and Ait Ben Haddou", "A free day in Marrakech"],
    days: [
      ["Tangier / Chefchaouen", "Meet your driver in Tangier and drive south into the Rif Mountains to Chefchaouen for the night."],
      ["Chefchaouen", "A free day in the blue city: the medina, the viewpoints and the mountain walks."],
      ["Chefchaouen / Volubilis / Meknes / Fes", "Visit the Roman ruins of Volubilis and stop in Meknes before arriving in Fes."],
      ["Fes / Merzouga", "Drive south through the Middle Atlas and the Ziz Valley to the Sahara. Ride a camel at sunset and spend the night in the desert camp."],
      ["Merzouga / Todra Gorges / Ouarzazate", "Sunrise over the dunes, then the Todra Gorges and the Dades Valley to Ouarzazate."],
      ["Ouarzazate / Ait Ben Haddou / Marrakech", "Visit Ait Ben Haddou and cross the High Atlas by the Tizi n’Tichka pass to Marrakech."],
      ["Marrakech", "A free day in Marrakech, with an optional guided visit to the medina. Transfer to the airport or station when you are ready."],
    ],
  },
  {
    slug: "8-days-from-tangier-to-casablanca-via-sahara-marrakech-and-essaouira",
    live: true,
    name: "8 Days from Tangier to Casablanca via the Sahara, Marrakech and Essaouira",
    origin: "Tangier", desert: true, hero: "2025-07-tanger-.jpg",
    images: ["2025-07-chefchaoun.jpg", "2019-11-merzouga.jpg", "2017-12-marrakech.jpg", "2017-12-essaouira.jpg"],
    overview: "A long journey from Tangier to Casablanca. You travel through Chefchaouen and Fes to the Sahara, cross the High Atlas to Marrakech, continue to Essaouira on the Atlantic and finish at the Hassan II Mosque.",
    highlights: ["Chefchaouen and Fes", "Camel trek and a night in a desert camp", "Ait Ben Haddou", "Marrakech medina", "Essaouira’s ramparts and port", "Hassan II Mosque in Casablanca"],
    days: [
      ["Tangier / Chefchaouen", "Meet your driver in Tangier and drive south into the Rif Mountains to Chefchaouen for the night."],
      ["Chefchaouen / Volubilis / Meknes / Fes", "Visit the Roman ruins of Volubilis and stop in Meknes before arriving in Fes."],
      ["Fes", "A full day with a licensed guide in the old medina: Bab Boujloud, the medersas, the tanneries and the souks."],
      ["Fes / Merzouga", "Drive through the Middle Atlas and the Ziz Valley to the Sahara. Camel ride at sunset and a night in the desert camp."],
      ["Merzouga / Todra Gorges / Ouarzazate", "Sunrise over the dunes, then the Todra Gorges and the Dades Valley to Ouarzazate."],
      ["Ouarzazate / Ait Ben Haddou / Marrakech", "Visit Ait Ben Haddou and cross the High Atlas by the Tizi n’Tichka pass to Marrakech."],
      ["Marrakech / Essaouira", "A morning in Marrakech, then drive west to Essaouira for the evening."],
      ["Essaouira / Casablanca", "Follow the Atlantic coast to Casablanca and visit the Hassan II Mosque. Airport or hotel transfer on arrival."],
    ],
  },

  // ---------------- Agadir (new departure city, four tours) ----------------
  // Stops are the ones already used by the existing tours. Driving times are not stated; the owner must confirm routes and overnights.
  {
    slug: "3-days-from-agadir-to-marrakech-via-essaouira",
    name: "3 Days from Agadir to Marrakech via Essaouira",
    origin: "Agadir", desert: false, live: true, hero: "2025-05-essaouira.jpg",
    images: ["2017-12-essaouira.jpg", "2025-07-essaouira-beach.jpg", "2017-12-marrakech.jpg", "2025-07-marrakech-medina.jpg"],
    overview: "A short route along the Atlantic coast and inland to the red city. You drive north from Agadir to Essaouira, spend a day in its medina and port, then continue to Marrakech.",
    highlights: ["Atlantic coast drive", "Essaouira’s ramparts, port and medina", "Marrakech medina and Jemaa el-Fna"],
    days: [
      ["Agadir / Essaouira", "Meet your driver in Agadir and follow the Atlantic coast north to Essaouira for the night."],
      ["Essaouira", "A free day in Essaouira: the ramparts, the fishing port, the medina and the beach."],
      ["Essaouira / Marrakech", "Drive inland to Marrakech and spend the afternoon in the medina and Jemaa el-Fna. Your driver takes you to your hotel, the airport or the station."],
    ],
  },
  {
    slug: "4-days-from-agadir-ouarzazate-marrakech-and-essaouira",
    name: "4 Days from Agadir: Ouarzazate, Marrakech and Essaouira",
    origin: "Agadir", desert: false, live: true, hero: "2017-12-ait-benhaddou.jpg",
    images: ["2017-12-ait-benhaddou.jpg", "2017-12-marrakech.jpg", "2017-12-essaouira.jpg", "2025-05-dades.jpg"],
    overview: "A round trip that begins and ends in Agadir. You cross to Ouarzazate and the kasbah of Ait Ben Haddou, cross the High Atlas to Marrakech, and return to the coast by way of Essaouira.",
    highlights: ["Guided visit to the kasbah of Ait Ben Haddou, a UNESCO World Heritage Site", "Crossing the High Atlas by the Tizi n’Tichka pass", "Marrakech medina", "Essaouira on the Atlantic coast"],
    days: [
      ["Agadir / Ouarzazate", "Meet your driver in Agadir and drive east to Ouarzazate for the night."],
      ["Ouarzazate / Ait Ben Haddou / Marrakech", "Visit the kasbah of Ait Ben Haddou with a local guide, then cross the High Atlas by the Tizi n’Tichka pass to Marrakech."],
      ["Marrakech", "A guided day in Marrakech: Bahia Palace, the Saadian Tombs, Koutoubia Mosque, the souks and Jemaa el-Fna."],
      ["Marrakech / Essaouira / Agadir", "Drive west to Essaouira for a walk through the port and medina, then follow the coast south to Agadir, where your tour ends."],
    ],
  },
  {
    slug: "5-days-from-agadir-to-marrakech-via-sahara",
    name: "5 Days from Agadir to Marrakech via the Sahara",
    origin: "Agadir", desert: true, live: true, hero: "2019-11-merzouga.jpg",
    images: ["2017-12-merzouga-camp.jpg", "2017-12-camel-trekking.jpg", "2017-12-dades-gorge.jpg", "2017-12-ait-benhaddou.jpg"],
    overview: "Five days from the Atlantic coast to the Sahara and the red city. You cross to Ouarzazate, drive through the Dades Valley and the Todra Gorges to the dunes of Merzouga for a night in the desert, then return by Ait Ben Haddou to Marrakech.",
    highlights: ["Dades Valley and Todra Gorges", "Camel trek and a night in a desert camp at Merzouga", "Kasbah of Ait Ben Haddou", "Crossing the High Atlas by the Tizi n’Tichka pass", "Marrakech"],
    days: [
      ["Agadir / Ouarzazate", "Meet your driver in Agadir and drive east to Ouarzazate for the night."],
      ["Ouarzazate / Dades Valley / Todra Gorges / Merzouga", "Drive east through the Dades Valley and the Todra Gorges to the Sahara. Ride a camel at sunset and spend the night in the desert camp."],
      ["Merzouga / Ouarzazate", "Sunrise over the dunes, then a long return drive west to Ouarzazate."],
      ["Ouarzazate / Ait Ben Haddou / Marrakech", "Visit the kasbah of Ait Ben Haddou and cross the High Atlas by the Tizi n’Tichka pass to Marrakech."],
      ["Marrakech", "A free day in Marrakech, with an optional guided visit to the medina. Transfer to the airport or station when you are ready."],
    ],
  },
  {
    slug: "6-days-from-agadir-to-marrakech-via-essaouira-and-sahara",
    name: "6 Days from Agadir to Marrakech via Essaouira and the Sahara",
    origin: "Agadir", desert: true, live: true, hero: "2017-12-desert-bg.jpg",
    images: ["2017-12-essaouira.jpg", "2017-12-marrakech.jpg", "2019-11-merzouga.jpg", "2017-12-ait-benhaddou.jpg"],
    overview: "The sea, the red city and the Sahara in six days. You follow the Atlantic coast to Essaouira, spend a day in Marrakech, then cross the High Atlas to the dunes of Merzouga before returning to Marrakech.",
    highlights: ["Essaouira on the Atlantic coast", "Marrakech medina", "Ait Ben Haddou and the Tizi n’Tichka pass", "Camel trek and a night in a desert camp at Merzouga"],
    days: [
      ["Agadir / Essaouira", "Meet your driver in Agadir and follow the Atlantic coast north to Essaouira for the night."],
      ["Essaouira / Marrakech", "Spend the morning in Essaouira’s port and medina, then drive inland to Marrakech."],
      ["Marrakech / Ait Ben Haddou / Ouarzazate", "Cross the High Atlas by the Tizi n’Tichka pass, visit Ait Ben Haddou and stay in Ouarzazate."],
      ["Ouarzazate / Dades Valley / Todra Gorges / Merzouga", "Drive east through the Dades Valley and the Todra Gorges to the Sahara. Ride a camel at sunset and spend the night in the desert camp."],
      ["Merzouga / Ouarzazate", "Sunrise over the dunes, then a long return drive west to Ouarzazate."],
      ["Ouarzazate / Marrakech", "Return to Marrakech over the High Atlas. Transfer to the airport or station on arrival."],
    ],
  },

  // ---------------- Errachidia (new departure city) ----------------
  {
    slug: "2-days-from-errachidia-to-merzouga-desert-camp",
    name: "2 Days from Errachidia: Merzouga Desert Camp",
    origin: "Errachidia", desert: true, inc: "ERR", live: true, hero: "2018-06-merzouga_000033781372_xxxlarge.jpg",
    images: ["2017-12-camel-trekking.jpg", "2017-12-merzouga-camp.jpg", "2019-11-merzouga.jpg"],
    overview: "The shortest way into the Sahara from Errachidia. You drive south to the dunes of Merzouga, ride a camel at sunset, sleep in a desert camp and watch the sunrise before returning to Errachidia.",
    highlights: ["Camel trek into the Erg Chebbi dunes at sunset", "A night in a desert camp", "Sunrise over the dunes", "Rissani and its souk"],
    days: [
      ["Errachidia / Erfoud / Merzouga", "Meet your driver in Errachidia and drive south through the Ziz Valley and Erfoud to the dunes of Merzouga. In the late afternoon ride a camel into the dunes for sunset and spend the night in a desert camp."],
      ["Merzouga / Rissani / Errachidia", "Watch the sunrise over the dunes, then visit Rissani and its souk before driving back north to Errachidia, where your tour ends."],
    ],
  },
  {
    slug: "3-days-from-errachidia-to-merzouga-todra-gorges-and-dades-valley",
    live: true,
    name: "3 Days from Errachidia: Merzouga, Todra Gorges and Dades Valley",
    origin: "Errachidia", desert: true, inc: "ERR", hero: "2018-06-merzouga_000033781372_xxxlarge.jpg",
    images: ["2017-12-camel-trekking.jpg", "2017-12-merzouga-camp.jpg", "2017-12-dades-gorge.jpg", "2019-11-merzouga.jpg"],
    overview: "A short desert loop that starts and ends in Errachidia. You drive to the dunes of Merzouga for a camel trek and a night in a desert camp, then return through the Todra Gorges and the Dades Valley. It is a compact way to see the Sahara and the oases of the south-east.",
    highlights: ["Camel trek into the Erg Chebbi dunes at sunset", "A night in a desert camp", "Sunrise over the dunes", "Rissani and its souk", "Todra Gorges and the Dades Valley"],
    days: [
      ["Errachidia / Erfoud / Merzouga", "Meet your driver in Errachidia and drive south through the Ziz Valley and Erfoud to the dunes of Merzouga. In the late afternoon ride a camel into the dunes for sunset and spend the night in a desert camp."],
      ["Merzouga / Rissani / Todra Gorges / Dades", "Watch the sunrise over the dunes, then visit Rissani and its souk before driving west to the Todra Gorges and on into the Dades Valley for the night."],
      ["Dades / Tinghir / Errachidia", "Drive back east through the oases of Tinghir and Tinjdad to Errachidia, where your tour ends."],
    ],
  },
  {
    slug: "3-days-from-errachidia-to-fes-via-merzouga-midelt-and-ifrane",
    name: "3 Days from Errachidia to Fes via Merzouga, Midelt and Ifrane",
    origin: "Errachidia", desert: true, inc: "ERR_FES", hero: "2019-11-merzouga.jpg",
    images: ["2017-12-merzouga-camp.jpg", "2025-07-ifrane-.jpg", "2025-09-fes.jpg", "2017-12-fes-1.jpg"],
    overview: "From the edge of the desert to the old medina of Fes. You spend a night in a desert camp at Merzouga, then cross the Ziz Valley, Midelt and the Middle Atlas to Fes, with a full day left in the imperial city.",
    highlights: ["Camel trek and a night in a desert camp at Merzouga", "Ziz Valley and Midelt", "Ifrane and the Middle Atlas", "Guided visit to the Fes medina"],
    days: [
      ["Errachidia / Erfoud / Merzouga", "Meet your driver in Errachidia and drive south through the Ziz Valley and Erfoud to Merzouga. Ride a camel into the dunes at sunset and spend the night in a desert camp."],
      ["Merzouga / Midelt / Ifrane / Fes", "Watch the sunrise over the dunes, then begin the long drive north through the Ziz Valley and Midelt and across the Middle Atlas, past Ifrane, to Fes."],
      ["Fes", "A full day with a licensed guide in the old medina: Bab Boujloud, the Qarawiyyin quarter, the medersas, the tanneries and the souks. Your driver then takes you to the airport, station or onward destination."],
    ],
  },
  {
    slug: "4-days-from-errachidia-to-marrakech-via-merzouga-and-ait-ben-haddou",
    name: "4 Days from Errachidia to Marrakech via Merzouga and Ait Ben Haddou",
    origin: "Errachidia", desert: true, inc: "ERR", hero: "2017-12-desert-bg.jpg",
    images: ["2017-12-camel-trekking.jpg", "2017-12-dades-gorge.jpg", "2017-12-ait-benhaddou.jpg", "2017-12-marrakech.jpg"],
    overview: "Four days from Errachidia to the red city. You spend a night in the Sahara at Merzouga, follow the gorges and kasbahs of the south through the Todra and Dades valleys, visit Ait Ben Haddou and cross the High Atlas to Marrakech.",
    highlights: ["Camel trek and a night in a desert camp", "Todra Gorges and the Dades Valley", "Guided visit to the kasbah of Ait Ben Haddou, a UNESCO World Heritage Site", "Crossing the High Atlas by the Tizi n’Tichka pass", "Marrakech"],
    days: [
      ["Errachidia / Erfoud / Merzouga", "Meet your driver in Errachidia and drive south through the Ziz Valley and Erfoud to the dunes. Ride a camel at sunset and spend the night in a desert camp."],
      ["Merzouga / Rissani / Todra Gorges / Dades", "Sunrise over the dunes, then Rissani and the Todra Gorges before reaching the Dades Valley for the night."],
      ["Dades / Skoura / Ouarzazate", "Follow the Valley of the Roses and the palm groves of Skoura to Ouarzazate for the night."],
      ["Ouarzazate / Ait Ben Haddou / Marrakech", "Visit the kasbah of Ait Ben Haddou with a local guide, then cross the High Atlas by the Tizi n’Tichka pass to Marrakech. Your driver takes you to your hotel, the airport or the station."],
    ],
  },
  {
    slug: "5-days-from-errachidia-to-marrakech-via-sahara-and-fes",
    name: "5 Days from Errachidia to Marrakech via the Sahara and Fes",
    origin: "Errachidia", desert: true, inc: "ERR_FES", hero: "2018-06-merzouga_000033781372_xxxlarge.jpg",
    images: ["2017-12-merzouga-camp.jpg", "2025-09-fes.jpg", "2025-07-ifrane-.jpg", "2017-12-marrakech.jpg"],
    overview: "Five days that link the desert, the imperial city of Fes and Marrakech. You spend a night in the Sahara at Merzouga, cross the Middle Atlas to Fes for a guided day in the medina, then travel south by the Ouzoud Waterfalls to Marrakech.",
    highlights: ["Camel trek and a night in a desert camp", "Ziz Valley, Midelt and Ifrane", "Guided visit to the Fes medina", "Ouzoud Waterfalls", "Marrakech"],
    days: [
      ["Errachidia / Erfoud / Merzouga", "Meet your driver in Errachidia and drive south to the dunes of Merzouga. Ride a camel at sunset and spend the night in a desert camp."],
      ["Merzouga / Midelt / Ifrane / Fes", "Sunrise over the dunes, then the long drive north through Midelt and the Middle Atlas, past Ifrane, to Fes."],
      ["Fes", "A full day with a licensed guide in the old medina: Bab Boujloud, the medersas, the tanneries and the souks."],
      ["Fes / Azrou / Beni Mellal / Ouzoud / Marrakech", "Leave Fes through the Middle Atlas and Azrou, stop at the Ouzoud Waterfalls and continue to Marrakech."],
      ["Marrakech", "A free day in Marrakech, with an optional guided visit to the medina. Transfer to the airport or station when you are ready."],
    ],
  },
];

const DESC = {
  "3-days-from-agadir-to-marrakech-via-essaouira": "Three days from Agadir to Marrakech by the Atlantic coast: a free day in Essaouira, then the Marrakech medina. Private driver, adjustable.",
  "4-days-from-agadir-ouarzazate-marrakech-and-essaouira": "Four days round trip from Agadir: Ait Ben Haddou, the High Atlas, Marrakech and Essaouira. A private journey with local guides.",
  "5-days-from-agadir-to-marrakech-via-sahara": "Five days from Agadir to Marrakech: the Dades Valley, Todra Gorges, a night in the Sahara at Merzouga and Ait Ben Haddou. Private and adjustable.",
  "6-days-from-agadir-to-marrakech-via-essaouira-and-sahara": "Six days from Agadir to Marrakech: Essaouira, Marrakech, Ait Ben Haddou and a night in the Sahara at Merzouga. Private driver and guides.",
  "2-days-from-errachidia-to-merzouga-desert-camp": "Two days from Errachidia: a camel trek at sunset, a night in a Sahara desert camp at Merzouga and sunrise over the dunes. Private driver.",
  "3-days-from-errachidia-to-merzouga-todra-gorges-and-dades-valley": "Three days from Errachidia: a camel trek and night in the Sahara at Merzouga, then the Todra Gorges and Dades Valley. Private driver, adjustable.",
  "3-days-from-errachidia-to-fes-via-merzouga-midelt-and-ifrane": "Three days from Errachidia to Fes: a night in the Sahara at Merzouga, Midelt and the Middle Atlas, then a guided day in the Fes medina. Private.",
  "4-days-from-errachidia-to-marrakech-via-merzouga-and-ait-ben-haddou": "Four days from Errachidia to Marrakech: a night in the Sahara, the Todra and Dades valleys, Ait Ben Haddou and the High Atlas. Private and adjustable.",
  "5-days-from-errachidia-to-marrakech-via-sahara-and-fes": "Five days from Errachidia to Marrakech: the Sahara at Merzouga, the Fes medina and the Ouzoud Waterfalls. A private journey you can adjust.",
  "7-days-from-marrakech-to-chefchaouen-via-sahara-and-fes": "Seven days from Marrakech to Chefchaouen: High Atlas, Ait Ben Haddou, a night in the Sahara at Merzouga, Fes and Volubilis. Private driver and local guides.",
  "3-days-from-fes-chefchaouen-volubilis-and-meknes": "Three days from Fes: Meknes, the Roman ruins of Volubilis and a night in the blue city of Chefchaouen. Private driver, adjustable to your dates.",
  "4-days-from-fes-to-casablanca-via-chefchaouen-and-rabat": "Four days from Fes to Casablanca: the Fes medina, Chefchaouen, Rabat and the Hassan II Mosque. Private driver and local guides.",
  "6-days-from-fes-to-marrakech-via-chefchaouen-and-sahara": "Six days from Fes to Marrakech: Chefchaouen, the Fes medina, a night in the Sahara, the Todra Gorges and Ait Ben Haddou. Private and adjustable.",
  "8-days-from-fes-to-casablanca-via-sahara-marrakech-and-essaouira": "Eight days from Fes to Casablanca: the Sahara at Merzouga, Ait Ben Haddou, Marrakech and Essaouira. A private loop with local guides.",
  "3-days-from-casablanca-to-fes-via-rabat-and-meknes": "Three days from Casablanca to Fes: the Hassan II Mosque, Rabat, Meknes and a full day in the Fes medina. Private driver, adjustable.",
  "4-days-from-casablanca-to-marrakech-via-essaouira": "Four days from Casablanca to Marrakech by the Atlantic coast: the Hassan II Mosque, Essaouira and Marrakech. Private driver and local guides.",
  "5-days-from-casablanca-to-marrakech-via-fes-and-sahara": "Five days from Casablanca to Marrakech: Rabat, Meknes, Fes, a night in the Sahara and Ait Ben Haddou. A private route you can adjust.",
  "6-days-from-casablanca-to-marrakech-via-essaouira-and-sahara": "Six days from Casablanca to Marrakech: Essaouira, Ait Ben Haddou and a night in the Sahara at Merzouga. Private driver and local guides.",
  "8-days-from-casablanca-via-chefchaouen-sahara-and-essaouira": "Eight days round trip from Casablanca: Chefchaouen, Fes, a night in the Sahara, Marrakech and Essaouira. Private and adjustable.",
  "3-days-from-tangier-to-fes-via-chefchaouen-and-meknes": "Three days from Tangier to Fes: a night in Chefchaouen, Volubilis, Meknes and a guided day in the Fes medina. Private driver, adjustable.",
  "4-days-from-tangier-to-casablanca-via-chefchaouen-and-rabat": "Four days from Tangier to Casablanca: Chefchaouen, Rabat and the Hassan II Mosque. A private route with a local driver, adjustable.",
  "5-days-from-tangier-to-marrakech-via-fes-and-sahara": "Five days from Tangier to Marrakech: Chefchaouen, Fes, a night in the Sahara at Merzouga and Ait Ben Haddou. Private and adjustable.",
  "6-days-from-tangier-to-marrakech-via-chefchaouen-fes-and-sahara": "Six days from Tangier to Marrakech: Chefchaouen, a guided day in Fes, a night in the Sahara and Ait Ben Haddou. Private driver and guides.",
  "7-days-from-tangier-to-marrakech-via-chefchaouen-sahara-and-fes": "Seven days from Tangier to Marrakech: free days in Chefchaouen and Marrakech, the Fes medina and a night in the Sahara. Private and adjustable.",
  "8-days-from-tangier-to-casablanca-via-sahara-marrakech-and-essaouira": "Eight days from Tangier to Casablanca: Chefchaouen, Fes, the Sahara, Marrakech and Essaouira. A private journey with local guides.",
};

const out = defs.map((d) => {
  const nights = d.days.length - 1;
  const n = d.days.length;
  const plural = (x) => `${x} ${x === 1 ? "day" : "days"}`;
  return {
    slug: d.slug,
    name: d.name,
    origin: d.origin,
    days: n,
    nights,
    seoTitle: `${d.name} | Private Tour`,
    seoDescription: DESC[d.slug],
    overview: [d.overview, CUSTOM],
    highlights: d.highlights,
    itinerary: d.days.map(([title, text], i) => ({ day: i + 1, title, text })),
    includes: d.inc ? INC[d.inc] : d.desert ? DESERT_INC : BASE_INC,
    excludes: EXC,
    faqs: [],
    hero: I(d.hero),
    images: d.images.map(I),
    // Drafted from public itineraries; to be approved by the owner before launch. `live: true` marks the ones already approved.
    draft: !d.live,
  };
});

const missing = out.flatMap((t) => [t.hero, ...t.images]).filter((p) => !fs.existsSync("public" + p));
if (missing.length) { console.error("Missing images:", missing); process.exit(1); }
fs.writeFileSync("src/content/tours-added.json", JSON.stringify(out, null, 1));
console.log(out.length, "tours written");
