import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/posts";
import { sanitizePostHtml } from "@/lib/sanitize";
import { postSchema } from "@/lib/post-schema";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Neautorizované." }, { status: 401 });

  const { id } = await params;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Nenájdené." }, { status: 404 });

  const parsed = postSchema.safeParse(await req.json().catch(() => null));
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
