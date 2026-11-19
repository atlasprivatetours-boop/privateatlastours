import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/lib/site";
import { joinCities, origins } from "@/lib/content";
import { orgSchema, websiteSchema } from "@/lib/schema";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: "normal", variable: "--font-cormorant", display: "swap" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Private Morocco Tours | Atlas Private Tours", template: "%s | Atlas Private Tours" },
  description: `Private, tailor-made Morocco tours with local Berber guides and licensed drivers. Sahara desert trips, imperial cities and day trips from ${joinCities(origins)}.`,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: SITE.name, url: SITE.url },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
};
export const viewport: Viewport = { themeColor: "#0e2211" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <JsonLd data={[orgSchema(), websiteSchema()]} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
