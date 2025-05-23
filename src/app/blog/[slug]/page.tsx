import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import rehypeMathjax from "rehype-mathjax";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";
import NavBar from "@/components/nav-bar";
import Link from "next/link";
import { ArrowLeft, ArrowUp } from "lucide-react";

type Props = {
  params: {
    slug: string;
  };
};

const options = {
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeHighlight, rehypeMathjax],
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src/app/posts", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] flex items-center justify-center">
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-[hsl(var(--destructive))] mb-4">
            Post not found
          </h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            The requested blog post could not be found.
          </p>
        </div>
      </div>
    );
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <NavBar />

        <main className="flex-1 pt-12 -pb-2">
          <Link
            href="/blog"
            className="mb-8 flex items-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>
        </main>

        {/* Header */}
        <header className="mb-12 border-b border-[hsl(var(--border))] pb-8">
          <h1 className="text-4xl font-bold text-[hsl(var(--foreground))] mb-4 leading-tight">
            {data.title || slug}
          </h1>
          {data.date && (
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
              {data.date}
            </p>
          )}
          {data.description && (
            <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
              {data.description}
            </p>
          )}
          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {data.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <article className="prose-blog max-w-none">
          <MDXRemote source={content} options={options} />
        </article>

        {/* Navigation or back button */}
        <footer className="mt-16 pt-8 border-t border-[hsl(var(--border))]">
          <div className="flex justify-between items-center">
            <a
              href="#"
              className="inline-flex items-center text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-colors">
              <ArrowUp className="w-4 h-4 mr-2" />
              Back to top
            </a>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              © {new Date().getFullYear()} • bhaskar
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "src/app/posts");
  const files = fs.readdirSync(postsDir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}
