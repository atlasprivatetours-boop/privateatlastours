// Tiny, data-free constants shared by server and client filter code.
// Keep this file free of imports from content.ts so client bundles stay small.
// Every departure city we run tours from, in display order. Cities with no visible tours are left out where lists are shown.
export const ALL_ORIGINS = ["Marrakech", "Fes", "Casablanca", "Tangier", "Agadir", "Errachidia"] as const;
export const origins = ALL_ORIGINS;
// "Marrakech, Fes and Casablanca"
export const joinCities = (c: readonly string[]) => (c.length > 1 ? `${c.slice(0, -1).join(", ")} and ${c[c.length - 1]}` : c.join(""));
// "Desert escape" is a desert trip with no imperial cities, coast or Chefchaouen, so it narrows the many tours that cross the Sahara.
export const STYLES = ["Desert escape", "Sahara desert", "Imperial cities", "Blue city", "Atlantic coast"] as const;
export type Style = (typeof STYLES)[number];
export const LENGTHS = [
  { id: "short", label: "2–4 days", test: (d: number) => d <= 4 },
  { id: "medium", label: "5–7 days", test: (d: number) => d >= 5 && d <= 7 },
  { id: "long", label: "8+ days", test: (d: number) => d >= 8 },
] as const;
