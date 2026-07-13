import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactSection } from "@/components/ContactSection";
import { values, industries, certifications } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "O mne",
  description:
    "Andrej Brehovský — ekonóm a certifikovaný účtovník pre malé a stredné firmy.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <span className="mb-3 inline-block text-xs uppercase tracking-[0.25em] text-muted">
              O mne
            </span>
            <h1 className="text-4xl leading-[1.1] md:text-6xl">{site.name}</h1>
            <p className="mt-4 text-xl md:text-2xl">
              Ekonóm pre firmy, ktoré to myslia <span className="bg-brand px-1">vážne</span>.
            </p>
            <p className="mt-6 max-w-md text-muted">
              Pomáham majiteľom firiem mať vo financiách poriadok a rozhodovať
              sa na základe čísel — nie pocitov.
            </p>
          </div>
          <ImagePlaceholder rounded className="aspect-[4/5] w-full" />
        </Container>
      </section>

      {/* Story */}
      <section className="border-t border-line py-20 md:py-28">
        <Container className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Príbeh"
              title="Ako som sa stal partnerom pre malé firmy"
            />
            <div className="mt-6 space-y-4 text-muted">
              <p>
                Začínal som ako účtovník v korporácii. Rýchlo som ale zistil, že
                ma napĺňa niečo iné — práca s ľuďmi a s firmami, kde moja rada
                naozaj niečo zmení.
              </p>
              <p>
                Malé firmy nechcú len číslo v tabuľke. Chcú niekoho, kto rozumie
                ich biznisu, vysvetlí im veci zrozumiteľne a pomôže im rásť.
              </p>
              <p>
                Preto som sa vydal na vlastnú cestu a dnes som ekonomickým
                partnerom pre desiatky firiem. Každú z nich beriem ako svoju.
              </p>
            </div>
          </div>
          <ImagePlaceholder rounded className="aspect-[4/3] w-full" />
        </Container>
      </section>

      {/* Values */}
      <section className="border-t border-line bg-[#fafafa] py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Hodnoty" title="V čo verím" align="center" />
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="text-center">
                  <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand">
                    <Icon size={26} />
                  </span>
                  <h3 className="text-xl">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted">{v.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Education & certifications */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Kvalifikácia" title="Vzdelanie a certifikácie" />
          <div className="mt-12 space-y-8">
            {certifications.map((c, i) => (
              <div
                key={i}
                className={`grid items-center gap-8 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <ImagePlaceholder rounded className="aspect-[16/9] w-full" />
                <p className="text-lg leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Experience / industries */}
      <section className="border-t border-line bg-[#fafafa] py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Skúsenosti"
            title="12 rokov v praxi"
            subtitle="Za roky praxe som pracoval s firmami z rôznych odvetví."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {industries.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink px-5 py-2.5 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-10 max-w-xl text-muted">
            Každé odvetvie má svoje špecifiká — a ja im rozumiem.
          </p>
        </Container>
      </section>

      {/* Off hours */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Mimo práce" title="Keď nezapínam Excel" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Mimo práce ma nájdete pri behu v prírode, s dobrou knihou alebo pri
            varení pre rodinu. Verím, že dobrý oddych je základ toho, aby človek
            odviedol poctivú prácu — v číslach aj mimo nich.
          </p>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
