import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ContactForm";

export function ContactSection() {
  return (
    <section id="kontakt" className="border-t border-line py-20 md:py-28">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl md:text-4xl">Kontakt</h2>
          <p className="mt-4 max-w-md text-muted">
            Máte otázku, alebo chcete začať spoluprácu? Napíšte mi. Prvá
            konzultácia je vždy nezáväzná a bezplatná.
          </p>

          <div className="mt-10">
            <p className="text-xl font-semibold">{site.name}</p>
            <div className="mt-4 space-y-3">
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 text-ink hover:text-muted"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand">
                  <Phone size={18} />
                </span>
                {site.phone}
              </a>
              <a
                href={site.emailHref}
                className="flex items-center gap-3 text-ink hover:text-muted"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand">
                  <Mail size={18} />
                </span>
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </Container>
    </section>
  );
}
