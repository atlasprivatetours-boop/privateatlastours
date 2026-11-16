import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "Let’s plan your Morocco | Atlas Private Tours";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ title: "Let’s plan your Morocco", eyebrow: "Contact", image: "/images/2017-12-atlas-private-tours-52.jpg" });
}
