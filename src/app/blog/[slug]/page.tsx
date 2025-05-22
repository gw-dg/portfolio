import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import NavBar from "@/components/nav-bar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-[hsl(var(--foreground))]">
      <div className="container relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8">
        <NavBar />

        <main className="flex-1 py-12">
          <Link
            href="/blog"
            className="mb-8 flex items-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="mb-4 text-4xl font-bold text-[hsl(var(--foreground))]">
                {post.frontmatter.title}
              </h1>
              <p className="mb-4 text-xl text-[hsl(var(--muted-foreground))]">
                {post.frontmatter.description}
              </p>

              <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                <span>{post.frontmatter.date}</span>
                <span>•</span>
                <span>{post.frontmatter.readTime}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.frontmatter.tags?.map((tag) => (
                  <span key={tag} className="theme-badge">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div
              className="prose max-w-none 
              prose-headings:text-[hsl(var(--prose-heading))] prose-headings:font-medium
              prose-p:text-[hsl(var(--prose-body))] prose-p:leading-7
              prose-a:text-[hsl(var(--prose-links))] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[hsl(var(--prose-bold))] prose-strong:font-semibold
              prose-code:text-[hsl(var(--prose-code))] prose-code:bg-[hsl(var(--muted))] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-blockquote:border-l-[hsl(var(--prose-quote-border))] prose-blockquote:text-[hsl(var(--prose-quote))] prose-blockquote:italic
              prose-ul:text-[hsl(var(--prose-body))] prose-ol:text-[hsl(var(--prose-body))]
              prose-li:text-[hsl(var(--prose-body))] prose-li:leading-7">
              <MDXRemote source={post.content} />
            </div>
          </article>
        </main>

        <footer className="py-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
          <p>© {new Date().getFullYear()} • bhaskar</p>
        </footer>
      </div>
    </div>
  );
}
