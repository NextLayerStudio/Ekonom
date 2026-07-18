"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadImage } from "@/lib/upload-client";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
};

export function ImageUpload({
  value,
  onChange,
  label = "Obrázok",
  hint = "JPG, PNG, WebP alebo GIF · max. 5 MB",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nahrávanie zlyhalo.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <p className="mb-3 text-sm font-semibold">{label}</p>

      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-line">
          <div className="relative aspect-[16/10] w-full bg-[#fafafa]">
            <Image src={value} alt="" fill className="object-cover" unoptimized />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
            title="Odstrániť"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line bg-[#fafafa] px-4 py-10 text-sm text-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              Nahrávam…
            </>
          ) : (
            <>
              <ImagePlus size={24} />
              Kliknite pre nahratie
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={onFileSelect}
      />

      {value && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="mt-3 text-sm text-muted underline hover:text-ink disabled:opacity-60"
        >
          {uploading ? "Nahrávam…" : "Nahrať iný obrázok"}
        </button>
      )}

      <p className="mt-2 text-xs text-muted">{hint}</p>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
