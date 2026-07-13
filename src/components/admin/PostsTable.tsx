"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import type { Post } from "@prisma/client";
import { formatDate } from "@/lib/posts";

export function PostsTable({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function onDelete(id: string, title: string) {
    if (!confirm(`Naozaj vymazať článok „${title}“?`)) return;
    setDeleting(id);
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    setDeleting(null);
    router.refresh();
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white p-16 text-center">
        <p className="text-muted">
          Zatiaľ žiadne články. Vytvorte prvý článok kliknutím na „Nový článok“.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
            <th className="px-5 py-4 font-medium">Názov</th>
            <th className="px-5 py-4 font-medium">Stav</th>
            <th className="hidden px-5 py-4 font-medium sm:table-cell">Dátum</th>
            <th className="px-5 py-4 text-right font-medium">Akcie</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-line last:border-0">
              <td className="px-5 py-4">
                <span className="font-medium">{post.title}</span>
                <span className="block text-xs text-muted">/{post.slug}</span>
              </td>
              <td className="px-5 py-4">
                {post.published ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs text-green-800">
                    Publikované
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs text-amber-800">
                    Koncept
                  </span>
                )}
              </td>
              <td className="hidden px-5 py-4 text-muted sm:table-cell">
                {formatDate(post.createdAt)}
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-1">
                  {post.published && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      title="Zobraziť"
                      className="rounded-lg p-2 text-muted hover:bg-ink/5 hover:text-ink"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  )}
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    title="Upraviť"
                    className="rounded-lg p-2 text-muted hover:bg-ink/5 hover:text-ink"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => onDelete(post.id, post.title)}
                    disabled={deleting === post.id}
                    title="Vymazať"
                    className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
