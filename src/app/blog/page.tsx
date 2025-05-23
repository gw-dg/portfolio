// blog/page.tsx
import { getAllPosts } from "@/lib/posts";
import NavBar from "@/components/nav-bar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// Metadata for the blog page
export const metadata: Metadata = {
  title: "Blog | Bhaskar Jha",
  description:
    "Thoughts on development, algorithms, design, and technology by Bhaskar Jha",
  openGraph: {
    title: "Blog | Bhaskar Jha",
    description:
      "Thoughts on development, algorithms, design, and technology by Bhaskar Jha",
    type: "website",
    images: [
      {
        url: new URL(
          "/api/og?title=Blog&description=Thoughts on development, algorithms, design, and technology",
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        ).toString(),
        width: 1200,
        height: 630,
        alt: "Bhaskar Jha's Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Bhaskar Jha",
    description:
      "Thoughts on development, algorithms, design, and technology by Bhaskar Jha",
    creator: "@bhaskar__jha",
  },
};

export default async function BlogPage() {
  const posts = getAllPosts();

  const validPosts = posts.filter(
    (post) =>
      post?.frontmatter?.title &&
      post?.frontmatter?.description &&
      post?.frontmatter?.date &&
      post?.slug
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-[hsl(var(--foreground))]">
      <div className="container relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-8">
        <NavBar />

        <main className="flex-1 py-12">
          <h1 className="mb-8 text-4xl font-bold text-[hsl(var(--foreground))]">
            Blogs
          </h1>

          {validPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[hsl(var(--muted-foreground))] text-lg">
                No blog posts found. Check your MDX files in the /posts
                directory.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {validPosts.map((post) => (
                <Card
                  key={post.slug}
                  className="theme-card theme-card-hover group transition duration-200">
                  <Link href={`/blog/${post.slug}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-[hsl(var(--card-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                          {post.frontmatter.title}
                        </CardTitle>
                        <ArrowRight className="h-5 w-5 text-[hsl(var(--muted-foreground))] group-hover:translate-x-1 group-hover:text-[hsl(var(--primary))] transition-all" />
                      </div>
                      <CardDescription className="py-2 text-[hsl(var(--muted-foreground))]">
                        {post.frontmatter.description}
                      </CardDescription>
                    </CardHeader>

                    {post.frontmatter.tags &&
                      post.frontmatter.tags.length > 0 && (
                        <CardContent>
                          <div className="py-2 flex flex-wrap gap-2">
                            {post.frontmatter.tags.map((tag) => (
                              <span
                                key={tag}
                                className="mr-2 ml-2 mt-1 mb-1 theme-badge">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      )}

                    <CardFooter className="text-sm text-[hsl(var(--muted-foreground))]">
                      <div className="py-2 flex items-center gap-3">
                        <span>{post.frontmatter.date}</span>
                        {post.frontmatter.readTime && (
                          <>
                            <span>•</span>
                            <span>{post.frontmatter.readTime}</span>
                          </>
                        )}
                      </div>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </main>

        <footer className="py-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
          <p>© {new Date().getFullYear()} • bhaskar</p>
        </footer>
      </div>
    </div>
  );
}
