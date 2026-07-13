import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { BlogCard } from "@/components/BlogCard";
import { ContactSection } from "@/components/ContactSection";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praktické tipy a novinky zo sveta ekonómie a daní — písané ľudsky, nie právnicky.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Blog"
            title="Praktické tipy zo sveta ekonómie a daní"
            subtitle="Písané ľudsky, nie právnicky. Bez zbytočného žargónu."
          />

          {posts.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          ) : (
            <p className="mt-12 rounded-2xl border border-dashed border-line p-16 text-center text-muted">
              Zatiaľ tu nie sú žiadne články. Čoskoro pribudnú — sledujte nás.
            </p>
          )}
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
