import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES[file.type]) {
    return "Povolené formáty: JPG, PNG, WebP, GIF.";
  }
  if (file.size > MAX_BYTES) {
    return "Obrázok môže mať maximálne 5 MB.";
  }
  return null;
}

export async function saveImage(file: File): Promise<string> {
  const ext = ALLOWED_TYPES[file.type];
  const name = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`blog/${name}`, file, { access: "public" });
    return blob.url;
  }

  const dir = path.join(process.cwd(), "public", "uploads", "blog");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, name), buffer);
  return `/uploads/blog/${name}`;
}
