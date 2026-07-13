import { prisma } from "@/lib/prisma";
import type { Post } from "@prisma/client";

/**
 * All data-access helpers below fail gracefully when the database is not yet
 * connected (no DATABASE_URL). This lets the site build and render before Neon
 * is wired up — blog pages simply show an empty state.
 */

export async function getPublishedPosts(limit?: number): Promise<Post[]> {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await prisma.post.findFirst({ where: { slug, published: true } });
  } catch {
    return null;
  }
}

export async function getAllPostsAdmin(): Promise<Post[]> {
  try {
    return await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    return await prisma.post.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function formatDate(date: Date | string | null): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("sk-SK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
