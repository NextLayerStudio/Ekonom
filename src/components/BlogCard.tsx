import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@prisma/client";
import { formatDate } from "@/lib/posts";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <ImagePlaceholder
        src={post.coverImage}
        alt={post.title}
        className="aspect-[16/10] w-full"
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          {formatDate(post.publishedAt ?? post.createdAt)}
        </span>
        <h3 className="mt-3 text-xl leading-snug">{post.title}</h3>
        {post.excerpt && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            {post.excerpt}
          </p>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
        >
          Čítať článok
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
