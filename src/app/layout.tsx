import type { Metadata } from "next";
import { Libre_Caslon_Text } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const libreCaslon = Libre_Caslon_Text({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-libre-caslon",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Kompletný ekonomický servis pre malé a stredné firmy — účtovníctvo, mzdy, dane a ekonomické poradenstvo.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk" className={libreCaslon.variable}>
      <body className="min-h-screen bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
