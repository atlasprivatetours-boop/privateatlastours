export const SITE = {
  name: "Atlas Private Tours",
  url: "https://atlasprivatetours.com",
  tagline: "Private journeys across Morocco, led by a local Berber family",
  phone: "+212 699 870 254",
  phoneHref: "tel:+212699870254",
  whatsapp: "https://wa.me/212699870254",
  email: "atlasprivatetours@gmail.com",
  facebook: "https://www.facebook.com/atlasprivatetours/",
  tripadvisor: "https://www.tripadvisor.com/Attraction_Review-g293733-d13237932-Reviews-Atlas_Private_Tours-Fez_Fez_Meknes.html",
  base: "Fes, Morocco",
  experience: "15+ years",
} as const;

export const NAV = [
  { href: "/tours", label: "Tours" },
  { href: "/destinations", label: "Destinations" },
  { href: "/day-trips", label: "Day trips" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/testimonials", label: "Guest stories" },
  { href: "/contact", label: "Contact" },
] as const;
