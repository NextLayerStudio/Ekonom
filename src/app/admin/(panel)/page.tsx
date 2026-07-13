import { Plus } from "lucide-react";
import { getAllPostsAdmin } from "@/lib/posts";
import { ButtonLink } from "@/components/ui/Button";
import { PostsTable } from "@/components/admin/PostsTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const posts = await getAllPostsAdmin();
  const publishedCount = posts.filter((p) => p.published).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl">Články</h1>
          <p className="mt-1 text-sm text-muted">
            {posts.length} spolu · {publishedCount} publikovaných
          </p>
        </div>
        <ButtonLink href="/admin/posts/new">
          <Plus size={16} /> Nový článok
        </ButtonLink>
      </div>

      <div className="mt-8">
        <PostsTable posts={posts} />
      </div>
    </div>
  );
}
