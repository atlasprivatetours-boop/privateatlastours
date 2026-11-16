import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "Travel notes on Morocco | Atlas Private Tours";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ title: "Travel notes on Morocco", eyebrow: "The journal", image: "/images/2017-12-atlas-private-tours-84.jpg" });
}
