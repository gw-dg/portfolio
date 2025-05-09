import AnimatedBackground from "@/components/animated-background";
import NavBar from "@/components/nav-bar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "Building a Minimalist Portfolio with Next.js and Tailwind",
    description:
      "Learn how to create a clean, minimalist portfolio website using Next.js and Tailwind CSS.",
    date: "May 9, 2025",
    readTime: "5 min read",
    slug: "building-minimalist-portfolio",
    tags: ["Next.js", "Tailwind CSS", "Web Design"],
    content: `
      <p>
        In this tutorial, we'll walk through the process of creating a minimalist portfolio website using Next.js and Tailwind CSS. We'll focus on clean design, performance, and accessibility.
      </p>
      
      <h2>Getting Started</h2>
      
      <p>
        First, let's set up a new Next.js project with Tailwind CSS. This gives us a solid foundation with server-side rendering capabilities and a utility-first CSS framework.
      </p>
      
      <pre><code>npx create-next-app@latest my-portfolio</code></pre>
      
      <h2>Designing the Layout</h2>
      
      <p>
        For a minimalist design, we want to focus on typography, spacing, and subtle animations. The key is to remove anything unnecessary and let the content breathe.
      </p>
      
      <h2>Creating an Animated Background</h2>
      
      <p>
        One of the standout features of our portfolio will be an animated gradient background. We'll use the Canvas API to create a subtle, performant animation that adds visual interest without distracting from the content.
      </p>
      
      <h2>Building the Components</h2>
      
      <p>
        We'll create reusable components for our portfolio, including a navigation bar, project cards, and a contact form. This modular approach makes our code more maintainable and easier to update.
      </p>
      
      <h2>Optimizing for Performance</h2>
      
      <p>
        Performance is crucial for a good user experience. We'll implement image optimization, code splitting, and other techniques to ensure our portfolio loads quickly and runs smoothly.
      </p>
      
      <h2>Conclusion</h2>
      
      <p>
        By following these steps, you'll have a beautiful, minimalist portfolio that showcases your work effectively. Remember, in minimalist design, less is more. Focus on what's essential and remove everything else.
      </p>
    `,
  },
];

const getBlogPostBySlug = (slug: string) => {
  return blogPosts.find((post) => post.slug === slug);
};

// Following the exact syntax from the documentation
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8">
        <NavBar />

        <main className="flex-1 py-12">
          <Link
            href="/blog"
            className="mb-8 flex items-center text-gray-300 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
              <p className="mb-4 text-xl text-gray-300">{post.description}</p>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/10 px-2 py-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div
              className="prose prose-invert max-w-none prose-headings:font-medium prose-a:text-blue-400"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </main>

        <footer className="py-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} • bhaskar</p>
        </footer>
      </div>
    </div>
  );
}
