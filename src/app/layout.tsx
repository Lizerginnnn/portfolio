import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import "@/styles/main.scss";

export const metadata: Metadata = {
  title: "Кондратьева Елизавета — UX/UI-дизайнер",
  description:
    "Портфолио UX/UI-дизайнера: B2B, EdTech и e-commerce. Проекты SellSaver, HairGrad, Newdex, «Смарт» и «Мапинс».",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
