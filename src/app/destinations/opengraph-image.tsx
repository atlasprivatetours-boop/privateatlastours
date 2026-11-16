import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "Where we take you | Atlas Private Tours";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ title: "Where we take you", eyebrow: "Destinations", image: "/images/2017-12-atlas-private-tours-60.jpg" });
}
