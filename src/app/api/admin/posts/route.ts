import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/posts";
import { sanitizePostHtml } from "@/lib/sanitize";

const postSchema = z.object({
  title: z.string().min(1, "Zadajte názov."),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().default(""),
  coverImage: z.string().url().optional().or(z.literal("")),
  published: z.boolean().default(false),
});

async function uniqueSlug(base: string): Promise<string> {
  const root = slugify(base) || "clanok";
  let slug = root;
  let n = 1;
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${root}-${n++}`;
  }
  return slug;
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Neautorizované." }, { status: 401 });

  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Neautorizované." }, { status: 401 });

  const parsed = postSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Neplatné údaje." },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const slug = await uniqueSlug(data.slug || data.title);

  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt || null,
      content: sanitizePostHtml(data.content),
      coverImage: data.coverImage || null,
      published: data.published,
      publishedAt: data.published ? new Date() : null,
      authorId: session.userId,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
