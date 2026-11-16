// Search titles and descriptions for every tour. Each one puts the route and length first (that is how people search:
// "fes to marrakech desert tour 3 days", "marrakech to merzouga tour") and states only what the itinerary really contains.
// Titles stay near 50 characters so the brand suffix is the only part Google may trim.
export const TOUR_SEO: Record<string, { title: string; description: string }> = {
  "10-days-tours-from-marrakech-imperial-cities": {
    title: "10-Day Imperial Cities & Sahara Tour from Marrakech",
    description: "Ten days from Marrakech through Casablanca, Rabat, Meknes, Volubilis and Fes to the Sahara at Merzouga, then back over the Atlas. Private driver and guides.",
  },
  "4-days-from-fes-to-merzouga-desert": {
    title: "4-Day Fes to Marrakech Desert Tour via Merzouga",
    description: "Private 4-day desert tour from Fes to Marrakech via Merzouga and Erg Chebbi, with Ouarzazate on the way. Local driver-guide, adjustable to your dates.",
  },
  "3-days-from-marrakech-to-desert-merzouga": {
    title: "3-Day Marrakech to Merzouga Desert Tour",
    description: "Private 3-day tour from Marrakech to the Sahara at Merzouga over the Tizi n’Tichka pass, via Ait Ben Haddou and the Dades and Todra gorges. Return to Marrakech.",
  },
  "3-days-from-fes-to-marrakech-desert-trip": {
    title: "3-Day Fes to Marrakech Desert Tour",
    description: "A private 3-day desert trip from Fes to Marrakech via Erfoud, Merzouga and Ouarzazate. Local driver, adjustable to your dates and pace.",
  },
  "9-days-casablanca-rabat-fes-marrakech-desert": {
    title: "9-Day Imperial Cities Tour from Casablanca",
    description: "Nine days from Casablanca through Rabat, Meknes, Fes, the Ouzoud Waterfalls, Marrakech and Essaouira. A private round trip, adjustable to you.",
  },
  "7-day-tour-from-casablanca-to-marrakech": {
    title: "7-Day Casablanca to Marrakech Desert Tour",
    description: "Seven days from Casablanca via Rabat, Chefchaouen, Volubilis and Fes to the Sahara at Merzouga, then Ait Ben Haddou and Marrakech. Private and adjustable.",
  },
  "5-days-desert-trip-from-fes-to-experience": {
    title: "5-Day Fes to Marrakech Desert Trip via Merzouga",
    description: "Private 5-day trip from Fes to Marrakech: the Middle Atlas, Ziz Valley, camel trekking at Erg Chebbi, Dades Gorges, Rose Valley and Ait Ben Haddou.",
  },
  "4-day-tour-from-marrakesh-to-fes": {
    title: "4-Day Marrakech to Fes Desert Tour via Merzouga",
    description: "Private 4-day tour from Marrakech to Fes via the High Atlas, Dades Valley, Todra Gorge and a camel trek at Merzouga. Local driver-guide.",
  },
  "3-days-tour-from-marrakech-to-fes-via-sahara": {
    title: "3-Day Marrakech to Fes Desert Tour via Sahara",
    description: "Private 3-day tour from Marrakech to Fes via Ait Ben Haddou, the Dades, Tinghir, Merzouga in the Sahara, Midelt and Ifrane. Local guide, adjustable.",
  },
  "10-day-tour-itinerary-from-casablanca": {
    title: "10-Day Morocco Tour from Casablanca (Private)",
    description: "Ten days from Casablanca: Rabat, Chefchaouen, Volubilis, Fes, the Sahara at Merzouga, Ait Ben Haddou, Marrakech and Essaouira. Private and adjustable.",
  },
  "5-days-desert-tour-from-marrakech": {
    title: "5-Day Marrakech Desert Tour to Merzouga",
    description: "Private 5-day desert tour from Marrakech: Ait Ben Haddou, the Draa Valley, a night in a nomadic tent at Erg Chebbi, the Todra and Dades gorges, and Telouet.",
  },
  "4-days-tour-from-marrakech-to-merzouga": {
    title: "4-Day Marrakech to Merzouga Desert Tour",
    description: "Private 4-day tour from Marrakech to the Merzouga dunes via Tizi n’Tichka, Ait Benhaddou and the Dades and Todra gorges, returning over the High Atlas.",
  },
  "7-days-from-fes-imperial-cities-and-sahara": {
    title: "7-Day Fes to Marrakech: Imperial Cities & Sahara",
    description: "Seven days from Fes: the medina, Volubilis and Meknes, then the Sahara, Ouarzazate and Marrakech. A private journey, adjustable to your dates.",
  },
  "6-days-marrakech-merzouga-sahara-desert": {
    title: "6-Day Marrakech to Merzouga Sahara Desert Tour",
    description: "Private 6-day round trip from Marrakech: the Dades and Todra gorges, Merzouga and Rissani, and Ait Benhaddou, with airport transfers.",
  },

  // Drafts (hidden until approved). Their descriptions live in scripts/added-tours.mjs.
  "7-days-from-marrakech-to-chefchaouen-via-sahara-and-fes": { title: "7-Day Marrakech to Chefchaouen via Sahara & Fes", description: "" },
  "3-days-from-fes-chefchaouen-volubilis-and-meknes": { title: "3-Day Fes to Chefchaouen, Volubilis & Meknes Tour", description: "" },
  "4-days-from-fes-to-casablanca-via-chefchaouen-and-rabat": { title: "4-Day Fes to Casablanca via Chefchaouen & Rabat", description: "" },
  "6-days-from-fes-to-marrakech-via-chefchaouen-and-sahara": { title: "6-Day Fes to Marrakech via Chefchaouen & Sahara", description: "" },
  "8-days-from-fes-to-casablanca-via-sahara-marrakech-and-essaouira": { title: "8-Day Fes to Casablanca: Sahara, Marrakech, Essaouira", description: "" },
  "3-days-from-casablanca-to-fes-via-rabat-and-meknes": { title: "3-Day Casablanca to Fes via Rabat & Meknes", description: "" },
  "4-days-from-casablanca-to-marrakech-via-essaouira": { title: "4-Day Casablanca to Marrakech via Essaouira", description: "" },
  "5-days-from-casablanca-to-marrakech-via-fes-and-sahara": { title: "5-Day Casablanca to Marrakech via Fes & Sahara", description: "" },
  "6-days-from-casablanca-to-marrakech-via-essaouira-and-sahara": { title: "6-Day Casablanca to Marrakech via Essaouira & Sahara", description: "" },
  "8-days-from-casablanca-via-chefchaouen-sahara-and-essaouira": { title: "8-Day Casablanca Round Trip: Chefchaouen, Sahara", description: "" },
  "3-days-from-tangier-to-fes-via-chefchaouen-and-meknes": { title: "3-Day Tangier to Fes Tour via Chefchaouen", description: "" },
  "4-days-from-tangier-to-casablanca-via-chefchaouen-and-rabat": { title: "4-Day Tangier to Casablanca via Chefchaouen & Rabat", description: "" },
  "5-days-from-tangier-to-marrakech-via-fes-and-sahara": { title: "5-Day Tangier to Marrakech via Fes & Sahara", description: "" },
  "6-days-from-tangier-to-marrakech-via-chefchaouen-fes-and-sahara": { title: "6-Day Tangier to Marrakech: Chefchaouen, Fes, Sahara", description: "" },
  "7-days-from-tangier-to-marrakech-via-chefchaouen-sahara-and-fes": { title: "7-Day Tangier to Marrakech: Chefchaouen, Fes, Sahara", description: "" },
  "8-days-from-tangier-to-casablanca-via-sahara-marrakech-and-essaouira": { title: "8-Day Tangier to Casablanca via Sahara & Essaouira", description: "" },
  "3-days-from-agadir-to-marrakech-via-essaouira": { title: "3-Day Agadir to Marrakech Tour via Essaouira", description: "" },
  "4-days-from-agadir-ouarzazate-marrakech-and-essaouira": { title: "4-Day Agadir Round Trip: Marrakech & Essaouira", description: "" },
  "5-days-from-agadir-to-marrakech-via-sahara": { title: "5-Day Agadir to Marrakech Tour via Sahara", description: "" },
  "6-days-from-agadir-to-marrakech-via-essaouira-and-sahara": { title: "6-Day Agadir to Marrakech via Essaouira & Sahara", description: "" },
  "2-days-from-errachidia-to-merzouga-desert-camp": { title: "2-Day Errachidia Merzouga Desert Camp Tour", description: "" },
  "3-days-from-errachidia-to-merzouga-todra-gorges-and-dades-valley": { title: "3-Day Errachidia Desert Tour: Merzouga & Todra Gorges", description: "" },
  "3-days-from-errachidia-to-fes-via-merzouga-midelt-and-ifrane": { title: "3-Day Errachidia to Fes Tour via Merzouga", description: "" },
  "4-days-from-errachidia-to-marrakech-via-merzouga-and-ait-ben-haddou": { title: "4-Day Errachidia to Marrakech via Merzouga", description: "" },
  "5-days-from-errachidia-to-marrakech-via-sahara-and-fes": { title: "5-Day Errachidia to Marrakech via Sahara & Fes", description: "" },
};

// Destination titles and descriptions. "Merzouga desert camp" is the strongest low-competition phrase found (about 1,300
// searches a month, low difficulty), so the Sahara page leads with it. The copy repeats only what the site already says.
export const DESTINATION_SEO: Record<string, { title: string; description: string }> = {
  "merzouga-sahara": {
    title: "Merzouga Desert Camp & Sahara Tours (Private)",
    description: "Private Sahara tours to Merzouga and Erg Chebbi: camel treks, dune sunrises and a night in a desert camp, led by a local Berber family from Marrakech or Fes.",
  },
};

// Search results show about 60 characters of a title. Old blog titles run to 110, so keep the part before the first
// colon, dash or question mark when the whole title is too long, and cut at a word boundary as a last resort.
export function shortTitle(title: string, max = 52): string {
  const t = title.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const m = t.match(/^(.{20,}?)([:–—|?])/);
  if (m) {
    const head = m[2] === "?" ? m[1] + "?" : m[1].trim();
    if (head.length <= max) return head;
  }
  // Cut at a word boundary, then drop dangling small words ("... Is Better for") so the title still reads as a phrase.
  let cut = t.slice(0, max).replace(/\s+\S*$/, "");
  while (/\s(?:for|to|of|and|the|a|an|in|is|on|with|at|by|from|or)$/i.test(cut)) cut = cut.replace(/\s\S+$/, "");
  return cut;
}
