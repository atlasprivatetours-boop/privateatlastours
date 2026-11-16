import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "One day, one remarkable place | Atlas Private Tours";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ title: "One day, one remarkable place", eyebrow: "Day trips", image: "/images/2017-12-atlas-private-tours-88.jpg" });
}
