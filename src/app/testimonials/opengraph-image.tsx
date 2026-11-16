import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "In our guests’ words | Atlas Private Tours";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({ title: "In our guests’ words", eyebrow: "Guest stories", image: "/images/2017-12-atlas-private-tours-35.jpg" });
}
