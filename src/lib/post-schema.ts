import { z } from "zod";

/** Accepts full URLs or local paths like /uploads/blog/… */
export const imageField = z
  .string()
  .refine(
    (v) => v === "" || v.startsWith("/") || /^https?:\/\//.test(v),
    "Neplatná adresa obrázka."
  );

export const postSchema = z.object({
  title: z.string().min(1, "Zadajte názov."),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().default(""),
  coverImage: imageField.optional().or(z.literal("")),
  published: z.boolean().default(false),
});
