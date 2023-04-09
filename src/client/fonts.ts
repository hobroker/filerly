import { Open_Sans, Roboto_Mono } from "next/font/google";

export const monoFont = Roboto_Mono({
  display: "swap",
  weight: ["400", "600", "700"],
  subsets: ["latin", "cyrillic"],
});

export const mainFont = Open_Sans({
  display: "swap",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});
