import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { HeroImage } from "@/components/HeroImage";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { BlogCard } from "@/components/BlogCard";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { services, homeValues } from "@/lib/content";
import { getPublishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getPublishedPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fafafa] to-white py-16 md:py-24">
        <Container className="grid max-w-7xl grid-cols-1 items-center gap-12 pb-8 pl-3 pr-6 md:pl-5 md:pr-10 lg:max-w-[1400px] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pl-6 lg:pr-12 lg:pb-12 xl:gap-20 xl:pl-8 xl:pr-16">
          <div className="relative z-10 min-w-0 lg:-ml-2 lg:pr-2 xl:-ml-3">
            <h1 className="text-4xl leading-[1.08] md:text-5xl lg:text-6xl xl:text-[4.25rem]">
              <span className="block text-[1.08em] md:whitespace-nowrap">Ekonomické zázemie</span>
              <span className="mt-1 block md:mt-2 md:whitespace-nowrap">
                pre <span className="bg-brand px-2">vašu firmu</span>
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl lg:max-w-none">
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

          <HeroImage />
        </Container>
      </section>

      {/* Intro / why me */}
      <section className="border-t border-line py-24 md:py-32">
        <Container className="max-w-7xl lg:max-w-[1400px]">
          <h2 className="max-w-2xl">
            <span className="block text-[2.35rem] font-normal leading-[1.15] md:text-5xl lg:text-[3.5rem]">
              Ekonóm, ktorý{" "}
              <span className="relative whitespace-nowrap">
                rozumie
                <span
                  className="absolute -bottom-1 left-0 h-1 w-full bg-brand md:-bottom-1.5 md:h-1.5"
                  aria-hidden
                />
              </span>
            </span>
            <span className="mt-1 block font-[system-ui,sans-serif] text-[2.35rem] font-bold leading-[1.05] md:mt-2 md:text-5xl lg:text-[3.5rem]">
              vášmu biznisu
            </span>
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-14 lg:mt-12 lg:gap-x-20">
            <p className="text-lg leading-relaxed text-ink md:text-xl">
              Nie som len človek, čo podáva daňové priznania. Som partner,
              ktorý pozná vaše čísla tak dobre ako vy poznáte váš produkt.
              Pracujem s firmami, kde záleží na každom eure — a kde si
              nesprávny krok nemôžete dovoliť.
            </p>
            <p className="text-lg leading-relaxed text-ink md:text-xl">
              Viac ako 12 rokov skúseností s vedením účtovníctva, mzdovej
              agendy a ekonomického poradenstva pre malé a stredné podniky na
              Slovensku.
            </p>
          </div>

          <div className="mt-20 grid w-full grid-cols-1 justify-items-center gap-20 md:grid-cols-3 md:gap-x-12 lg:mt-24 lg:gap-x-20 xl:gap-x-28">
            {homeValues.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="flex w-full max-w-xs flex-col items-center text-center">
                  <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand">
                    <Icon size={36} strokeWidth={1.25} className="text-ink" />
                  </span>
                  <h3 className="text-xl font-bold md:text-2xl">{v.title}</h3>
                  <p className="mt-4 font-inter text-sm leading-snug text-muted md:text-base">
                    <span className="block">{v.lines[0]}</span>
                    <span className="block">{v.lines[1]}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="border-t border-line bg-white py-20 md:py-28">
        <Container className="max-w-none lg:max-w-[1400px]">
          <div className="max-w-3xl">
            <h2 className="text-4xl leading-tight md:text-5xl lg:text-[3.25rem]">
              Čo pre vás robím
            </h2>
            <p className="mt-4 font-inter text-lg leading-relaxed text-ink md:text-xl">
              <span className="font-bold">Kompletný ekonomický servis</span>
              {" — "}
              od každodenného účtovníctva až po strategické rozhodnutia.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <ButtonLink href="/sluzby" className="px-12 py-4 text-base font-semibold">
              Zobraziť všetky služby
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Behind the numbers */}
      <section className="border-t border-line py-20 md:py-28">
        <Container className="grid grid-cols-1 items-center gap-12 pl-3 pr-6 md:grid-cols-[0.94fr_1.06fr] md:pl-4 md:pr-10 lg:gap-16 lg:pl-5">
          <div className="max-w-xl md:-ml-5 lg:-ml-8 xl:-ml-10">
            <h2 className="text-[2.35rem] font-normal leading-[1.15] md:text-5xl lg:text-[3.25rem]">
              Kto stojí za číslami
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink md:mt-10 md:text-xl md:leading-relaxed">
              <p>
                Happy Gold je tím certifikovaných účtovníkov a ekonómov
                so skúsenosťami z rôznych odvetví — od e-commerce cez
                gastronómiu až po stavebníctvo.
              </p>
              <p>
                Verím, že správne nastavená ekonómia nie je len povinnosť — je
                to základ, na ktorom rastie zdravý biznis.
              </p>
            </div>
            <ButtonLink
              href="/o-firme"
              className="mt-10 px-10 py-4 text-base font-bold md:mt-12"
            >
              Viac o firme
            </ButtonLink>
          </div>
          <ImagePlaceholder
            src={site.aboutImage}
            alt={`Tím ${site.name}`}
            rounded
            objectPosition="center 20%"
            className="aspect-square w-full"
            sizes="(max-width: 768px) 100vw, 52vw"
          />
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
