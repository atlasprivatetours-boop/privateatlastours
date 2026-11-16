import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "Moments from the road | Atlas Private Tours";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ title: "Moments from the road", eyebrow: "Gallery", image: "/images/2017-12-atlas-private-tours-60.jpg" });
}
