import Image from "next/image";
import { site } from "@/lib/site";

export function HeroImage() {
  return (
    <div className="relative w-full">
      <div
        className="absolute -right-4 bottom-6 hidden h-[90%] w-[90%] rounded-[1.75rem] border border-line bg-white lg:block"
        aria-hidden
      />

      <figure className="relative">
        <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_28px_70px_-28px_rgba(0,0,0,0.35)] ring-1 ring-ink/8">
          <div className="relative aspect-[3/4] w-full sm:aspect-[4/5]">
            <Image
              src={site.heroImage}
              alt={`Tím ${site.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
              style={{ objectPosition: "center 14%" }}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent"
              aria-hidden
            />
          </div>

          <div
            className="absolute left-0 top-8 h-16 w-1 rounded-r-full bg-brand"
            aria-hidden
          />
        </div>
      </figure>
    </div>
  );
}
