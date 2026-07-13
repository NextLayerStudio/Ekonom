import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { BlogCard } from "@/components/BlogCard";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { services, homeValues } from "@/lib/content";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getPublishedPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="text-4xl leading-[1.1] md:text-6xl">
              Ekonomické zázemie
              <br /> pre <span className="bg-brand px-2">vašu firmu</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted">
              Vediem účtovníctvo, mzdy aj dane pre malé a stredné firmy — tak,
              aby ste sa vy mohli venovať tomu, čo viete najlepšie. Prehľadne,
              spoľahlivo a po ľudsky.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/kontakt">Nezáväzná konzultácia</ButtonLink>
              <ButtonLink href="/sluzby" variant="outline">
                Pozrieť služby
              </ButtonLink>
            </div>
          </div>
          <ImagePlaceholder rounded className="aspect-[4/3] w-full md:aspect-[5/6]" />
        </Container>
      </section>

      {/* Intro / why me */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
            <div>
              <SectionHeading
                title={
                  <>
                    Ekonóm, ktorý rozumie
                    <br /> vášmu biznisu
                  </>
                }
              />
              <div className="mt-6 space-y-4 text-muted">
                <p>
                  Nie som len účtovník, ktorý zaeviduje doklady. Som partner,
                  ktorý sa pozerá na vašu firmu z pohľadu čísel a pomáha vám
                  rozhodovať sa lepšie.
                </p>
                <p>
                  Za viac ako 12 rokov praxe som pomohol desiatkam firiem
                  nastaviť si financie tak, aby mali poriadok, prehľad a pokoj.
                </p>
              </div>
            </div>
            <ImagePlaceholder rounded className="aspect-[4/3] w-full" />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {homeValues.map((v) => {
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

      {/* Services */}
      <section className="border-t border-line bg-[#fafafa] py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Čo pre vás robím"
            title="Kompletný ekonomický servis"
            subtitle="Od každodenného účtovníctva až po strategické poradenstvo — všetko na jednom mieste."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <ButtonLink href="/sluzby">Zobraziť všetky služby</ButtonLink>
          </div>
        </Container>
      </section>

      {/* Behind the numbers */}
      <section className="border-t border-line py-20 md:py-28">
        <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="O mne" title="Kto stojí za číslami" />
            <div className="mt-6 space-y-4 text-muted">
              <p>
                Volám sa Andrej Brehovský. Som certifikovaný účtovník a ekonóm
                so skúsenosťami z rôznych odvetví — od e-commerce cez
                gastronómiu až po stavebníctvo.
              </p>
              <p>
                Verím, že správne vedené financie sú základ zdravej firmy. A že
                ich netreba komplikovať.
              </p>
            </div>
            <ButtonLink href="/o-mne" variant="outline" className="mt-8">
              Viac o mne <ArrowRight size={16} />
            </ButtonLink>
          </div>
          <ImagePlaceholder rounded className="aspect-square w-full" />
        </Container>
      </section>

      {/* Testimonials */}
      <section className="border-t border-line bg-[#fafafa] py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Referencie" title="Čo hovoria moji klienti" />
          <div className="mt-12">
            <Testimonials />
          </div>
        </Container>
      </section>

      {/* Blog */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Z blogu"
              title="Praktické tipy zo sveta ekonómie a daní"
              subtitle="Písané ľudsky, nie právnicky."
            />
            <ButtonLink href="/blog" variant="outline">
              Všetky články
            </ButtonLink>
          </div>

          {posts.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {posts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          ) : (
            <p className="mt-12 rounded-2xl border border-dashed border-line p-10 text-center text-muted">
              Články sa čoskoro objavia. Sledujte blog.
            </p>
          )}
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
