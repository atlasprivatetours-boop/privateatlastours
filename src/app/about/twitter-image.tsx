import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "Born in the Sahara | Atlas Private Tours";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ title: "Born in the Sahara", eyebrow: "About us", image: "/images/2017-12-atlas-private-tours-11.jpeg" });
}
