import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "Morocco tours, designed around you | Atlas Private Tours";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ title: "Morocco tours, designed around you", eyebrow: "Private tours", image: "/images/2017-12-atlas-private-tours-79.jpg" });
}
