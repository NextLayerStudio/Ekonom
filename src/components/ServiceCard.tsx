import Link from "next/link";
import type { Service } from "@/lib/content";
import { inter } from "@/lib/fonts";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="relative mx-auto w-full max-w-[360px] rounded-2xl border border-line bg-white px-7 py-8 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.12)] aspect-[360/414] sm:h-[414px] sm:w-[360px] sm:max-w-none">
      <div className="flex h-full flex-col items-center px-1 pt-2 text-center">
        <Icon size={56} strokeWidth={1.2} className="mb-6 shrink-0 text-ink" />

        <h3 className="font-serif text-2xl font-bold leading-snug">
          {service.title}
        </h3>

        <p
          className={`${inter.className} mt-5 w-full text-base font-normal leading-[1.6] text-ink/85`}
        >
          {service.short}
        </p>
      </div>

      <Link
        href={`/sluzby#${service.slug}`}
        className={`${inter.className} absolute bottom-8 right-8 text-base font-medium text-ink`}
      >
        <span className="relative z-10">Zobraziť viac</span>
        <span
          className="absolute bottom-0 left-1/2 z-0 h-2.5 w-[115%] -translate-x-1/2 translate-y-px rounded-full bg-brand"
          aria-hidden
        />
      </Link>
    </article>
  );
}
