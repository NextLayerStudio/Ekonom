import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ContactSection } from "@/components/ContactSection";
import { getPostBySlug, formatDate } from "@/lib/posts";
import { sanitizePostHtml } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Článok nenájdený" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
          >
            <ArrowLeft size={16} /> Späť na blog
          </Link>

          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted">
            {formatDate(post.publishedAt ?? post.createdAt)}
          </p>
          <h1 className="mt-3 text-4xl leading-tight md:text-5xl">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-5 text-xl text-muted">{post.excerpt}</p>
          )}

          <ImagePlaceholder
            src={post.coverImage}
            alt={post.title}
            rounded
            className="mt-10 aspect-[16/9] w-full"
          />

          <div
            className="prose prose-lg mt-10 max-w-none prose-headings:font-serif prose-a:text-ink prose-a:decoration-brand prose-a:decoration-2"
            dangerouslySetInnerHTML={{ __html: sanitizePostHtml(post.content) }}
          />
        </Container>
      </article>

      <ContactSection />
    </>
  );
}
