import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/posts";
import { sanitizePostHtml } from "@/lib/sanitize";

const updateSchema = z.object({
  title: z.string().min(1, "Zadajte názov."),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().default(""),
  coverImage: z.string().url().optional().or(z.literal("")),
  published: z.boolean().default(false),
});

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Neautorizované." }, { status: 401 });

  const { id } = await params;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Nenájdené." }, { status: 404 });

  const parsed = updateSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Neplatné údaje." },
      { status: 422 }
    );
  }
  const data = parsed.data;

  let slug = existing.slug;
  if (data.slug && data.slug !== existing.slug) {
    let candidate = slugify(data.slug) || existing.slug;
    let n = 1;
    while (
      await prisma.post.findFirst({
        where: { slug: candidate, NOT: { id } },
      })
    ) {
      candidate = `${slugify(data.slug)}-${n++}`;
    }
    slug = candidate;
  }

  const becamePublished = data.published && !existing.published;

  const post = await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt || null,
      content: sanitizePostHtml(data.content),
      coverImage: data.coverImage || null,
      published: data.published,
      publishedAt: becamePublished
        ? new Date()
        : data.published
          ? existing.publishedAt
          : null,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Neautorizované." }, { status: 401 });

  const { id } = await params;
  await prisma.post.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
