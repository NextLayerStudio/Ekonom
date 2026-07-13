"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const active = testimonials[index];

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  return (
    <div className="relative">
      <div className="rounded-3xl border border-line bg-white p-8 md:p-14">
        <Quote className="text-brand" size={40} />
        <blockquote className="mt-6 text-2xl leading-relaxed md:text-3xl">
          {active.quote}
        </blockquote>
        <div className="mt-8">
          <p className="text-lg font-semibold">{active.name}</p>
          <p className="text-sm text-muted">{active.role}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Referencia ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-brand" : "w-2.5 bg-line"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Predchádzajúca"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Ďalšia"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
