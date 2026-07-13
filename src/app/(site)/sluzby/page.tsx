import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactSection } from "@/components/ContactSection";
import { services, process } from "@/lib/content";

export const metadata: Metadata = {
  title: "Služby",
  description:
    "Účtovníctvo, mzdy, dane, finančné výkazy, zakladanie firmy a ekonomické poradenstvo pre firmy.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container>
          <span className="mb-3 inline-block text-xs uppercase tracking-[0.25em] text-muted">
            Služby
          </span>
          <h1 className="max-w-3xl text-4xl leading-[1.1] md:text-6xl">
            Komplexný ekonomický servis pre <span className="bg-brand px-2">vašu firmu</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Postarám sa o kompletnú ekonomickú agendu, aby ste sa vy mohli
            venovať rozvoju svojho biznisu. Vyberte si presne to, čo potrebujete.
          </p>
        </Container>
      </section>

      {/* Service detail sections */}
      <section className="border-t border-line">
        <Container>
          <div className="divide-y divide-line">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.slug}
                  id={s.slug}
                  className="scroll-mt-24 py-16 md:py-20"
                >
                  <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <div>
                      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand">
                        <Icon size={26} />
                      </span>
                      <span className="text-xs uppercase tracking-[0.2em] text-muted">
                        {s.title}
                      </span>
                      <h2 className="mt-2 text-3xl md:text-4xl">{s.headline}</h2>
                      <p className="mt-4 max-w-md text-muted">{s.short}</p>
                      <ButtonLink href="/kontakt" className="mt-8">
                        Mám záujem
                      </ButtonLink>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <div>
                        <h3 className="mb-4 text-lg">Čo zahŕňa</h3>
                        <ul className="space-y-3">
                          {s.includes.map((item) => (
                            <li key={item} className="flex gap-2.5 text-sm text-muted">
                              <Check size={18} className="mt-0.5 shrink-0 text-ink" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="mb-4 text-lg">Pre koho</h3>
                        <ul className="space-y-3">
                          {s.forWhom.map((item) => (
                            <li key={item} className="flex gap-2.5 text-sm text-muted">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-t border-line bg-[#fafafa] py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Postup" title="Ako vyzerá spolupráca" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div
                key={p.step}
                className="rounded-2xl border border-line bg-white p-6"
              >
                <span className="text-sm font-semibold text-muted">{p.step}</span>
                <div className="my-3 h-0.5 w-10 bg-brand" />
                <h3 className="text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
