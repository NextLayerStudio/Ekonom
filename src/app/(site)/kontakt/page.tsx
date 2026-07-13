import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Ozvite sa mi — prvá konzultácia je nezáväzná a bezplatná.",
};

export default function ContactPage() {
  return (
    <div className="pt-6">
      <ContactSection />
    </div>
  );
}
