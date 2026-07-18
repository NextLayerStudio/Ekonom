"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Post } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { slugify } from "@/lib/posts";

type Props = { post?: Post };

export function PostEditor({ post }: Props) {
  const router = useRouter();
  const isEdit = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [published, setPublished] = useState(post?.published ?? false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onTitleChange(v: string) {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  }

  async function save(nextPublished: boolean) {
    setSaving(true);
    setError(null);

    const payload = {
      title,
      slug: slug || undefined,
      excerpt,
      coverImage,
      content,
      published: nextPublished,
    };

    const url = isEdit ? `/api/admin/posts/${post!.id}` : "/api/admin/posts";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Uloženie zlyhalo.");
      setSaving(false);
    }
  }

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft size={16} /> Späť na prehľad
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl">{isEdit ? "Upraviť článok" : "Nový článok"}</h1>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => save(false)}
            disabled={saving || !title}
          >
            Uložiť koncept
          </Button>
          <Button onClick={() => save(true)} disabled={saving || !title}>
            {published ? "Uložiť a publikovať" : "Publikovať"}
          </Button>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-muted">Názov článku</label>
            <input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Napr. 5 chýb v účtovníctve, ktoré vás stoja peniaze"
              className="rounded-lg border border-line bg-white px-4 py-3 text-lg outline-none focus:border-ink"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-muted">Obsah</label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="rounded-xl border border-line bg-white p-5">
            <h3 className="mb-4 text-sm font-semibold">Nastavenia</h3>

            <label className="flex cursor-pointer items-center justify-between gap-3">
              <span className="text-sm">Publikované</span>
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-5 w-5 accent-[#e6d500]"
              />
            </label>

            <div className="mt-4 flex flex-col gap-1.5">
              <label className="text-sm text-muted">URL adresa (slug)</label>
              <input
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugTouched(true);
                }}
                placeholder="url-clanku"
                className="rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-ink"
              />
              <span className="text-xs text-muted">/blog/{slug || "…"}</span>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-white p-5">
            <h3 className="mb-4 text-sm font-semibold">Perex</h3>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={4}
              placeholder="Krátky úvod, ktorý sa zobrazí v zozname článkov."
              className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </div>

          <div className="rounded-xl border border-line bg-white p-5">
            <ImageUpload
              label="Titulný obrázok"
              value={coverImage}
              onChange={setCoverImage}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
