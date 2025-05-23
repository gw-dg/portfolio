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
                      <CardDescription className="text-[hsl(var(--muted-foreground))]">
                        {post.frontmatter.description}
                      </CardDescription>
                    </CardHeader>

                    {post.frontmatter.tags &&
                      post.frontmatter.tags.length > 0 && (
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {post.frontmatter.tags.map((tag) => (
                              <span key={tag} className="theme-badge">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      )}

                    <CardFooter className="text-sm text-[hsl(var(--muted-foreground))]">
                      <div className="flex items-center gap-3">
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
