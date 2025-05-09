import AnimatedBackground from "@/components/animated-background";
import NavBar from "@/components/nav-bar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
  },
  {
    id: 2,
    title: "The Power of Animated Backgrounds in Web Design",
    description:
      "Explore how subtle animations can enhance user experience without compromising performance.",
    date: "April 22, 2025",
    readTime: "4 min read",
    slug: "power-of-animated-backgrounds",
    tags: ["Animation", "Canvas API", "Performance"],
  },
  {
    id: 3,
    title: "Optimizing React Applications for Performance",
    description:
      "Tips and tricks to make your React applications faster and more efficient.",
    date: "April 10, 2025",
    readTime: "7 min read",
    slug: "optimizing-react-applications",
    tags: ["React", "Performance", "Optimization"],
  },
  {
    id: 4,
    title: "The Future of Web Development in 2025",
    description:
      "Predictions and trends that will shape the web development landscape in the coming year.",
    date: "March 28, 2025",
    readTime: "6 min read",
    slug: "future-of-web-development-2025",
    tags: ["Web Development", "Trends", "Future"],
  },
  {
    id: 5,
    title: "Creating Accessible UI Components from Scratch",
    description:
      "A guide to building UI components with accessibility in mind from the beginning.",
    date: "March 15, 2025",
    readTime: "8 min read",
    slug: "accessible-ui-components",
    tags: ["Accessibility", "UI Components", "Inclusive Design"],
  },
];

export default function BlogPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-8">
        <NavBar />

        <main className="flex-1 py-12">
          <h1 className="mb-8 text-4xl font-bold">Blog</h1>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="bg-black/50 border-white/10 text-white hover:bg-black/70 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <CardDescription className="text-gray-300">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white/10 px-2 py-1 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-gray-400">
                    <div className="flex items-center gap-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        </main>

        <footer className="py-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} • bhaskar</p>
        </footer>
      </div>
    </div>
  );
}
