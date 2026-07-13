import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div className="group flex flex-col rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.25)]">
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand">
        <Icon size={22} />
      </span>
      <h3 className="text-xl">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {service.short}
      </p>
      <Link
        href={`/sluzby#${service.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
      >
        Zobraziť viac
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
