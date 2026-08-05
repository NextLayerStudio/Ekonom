import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { inter, libreCaslon } from "@/lib/fonts";

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
    <html lang="sk" className={`${libreCaslon.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
