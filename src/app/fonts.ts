import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-inter-family",
  display: "swap",
});

/** CSS-переменные шрифтов (--font-geist-sans, --font-geist-mono, --font-inter-family) для <html>. */
export const fontVariables = [GeistSans.variable, GeistMono.variable, inter.variable].join(" ");
