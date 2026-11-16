import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "Atlas Private Tours: private Morocco tours led by a local Berber family";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ title: "Morocco, travelled the way it is lived.", eyebrow: "Private tours · Morocco", meta: "Sahara · Imperial cities · Day trips", image: "/images/2017-12-atlas-private-tours-13.jpeg" });
}
