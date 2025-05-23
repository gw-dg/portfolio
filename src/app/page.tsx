import Link from "next/link";
import { Github, LinkedinIcon, Mail, Twitter, Zap } from "lucide-react";
// import { Button } from "@/components/ui/button";
import SocialLink from "@/components/social-link";
import ProjectCard from "@/components/project-card";
import NavBar from "@/components/nav-bar";
import type { Metadata } from "next";

// Metadata for the home page
// Fixed metadata for the home page
export const metadata: Metadata = {
  title: "Bhaskar Jha - Developer & Designer",
  description:
    "Passionate developer and designer focused on creating beautiful, functional experiences. Interested in data structures, algorithms, web development, deep learning, embedded systems, and competitive programming.",
  keywords: [
    "Bhaskar Jha",
    "developer",
    "designer",
    "web development",
    "React",
    "JavaScript",
    "algorithms",
    "data structures",
    "machine learning",
    "deep learning",
    "embedded systems",
    "competitive programming",
    "Palanam Technologies",
  ],
  authors: [{ name: "Bhaskar Jha" }],
  creator: "Bhaskar Jha",
  publisher: "Bhaskar Jha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Bhaskar Jha",
    title: "Bhaskar Jha - Developer & Designer",
    description:
      "Passionate developer and designer focused on creating beautiful, functional experiences.",
    images: [
      {
        url: new URL(
          `/api/og?${new URLSearchParams({
            title: "Bhaskar Jha",
            description:
              "Developer & Designer passionate about creating beautiful experiences",
            // tags: "Developer,Designer",
          }).toString()}`,
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        ).toString(),
        width: 1200,
        height: 630,
        alt: "Bhaskar Jha - Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhaskar Jha - Developer & Designer",
    description:
      "Passionate developer and designer focused on creating beautiful, functional experiences.",
    creator: "@bhaskar__jha",
    site: "@bhaskar__jha",
    images: [
      new URL(
        `/api/og?${new URLSearchParams({
          title: "Bhaskar Jha",
          description:
            "Developer & Designer passionate about creating beautiful experiences",
          // tags: "Developer,Designer,React,JavaScript,Machine Learning",
        }).toString()}`,
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      ).toString(),
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "xJ3pZHVVmsSmWD_XNvywqNJTh_PF6yoSRxBrI2NaWYY",
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-[hsl(var(--foreground))]">
      <div className="container relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8">
        {/* Header with NavBar component */}
        <NavBar />

        {/* Main Content */}
        <main className="flex flex-1 flex-col justify-center py-12">
          <h1 className="mb-6 text-5xl font-bold text-[hsl(var(--foreground))]">
            Bhaskar Jha
          </h1>

          <p className="mb-8 text-xl text-[hsl(var(--foreground))]">
            Hey! I&apos;m a passionate developer and designer focused on
            creating beautiful, functional experiences.
          </p>

          <div className="mb-8">
            <h2 className="mb-2 text-lg font-medium text-[hsl(var(--muted-foreground))]">
              Working at
            </h2>
            <div className="flex items-center space-x-2">
              <span className="rounded-md bg-[hsl(var(--muted))] px-3 py-1 text-[hsl(var(--foreground))]">
                Palanam Technologies
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-2 text-lg font-medium text-[hsl(var(--muted-foreground))]">
              Creator of
            </h2>
            <div className="flex flex-wrap gap-2">
              <ProjectCard
                name="To All The Films"
                icon={
                  <Zap className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                }
                link="https://to-all-the-films.vercel.app/"
              />

              <ProjectCard
                name="PasteBox"
                icon={
                  <Zap className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                }
                link="https://save-your-last-note.vercel.app/"
              />
            </div>
          </div>

          <p className="mb-8 text-lg text-[hsl(var(--foreground))]">
            Interested in data structures, algorithms, web development, deep
            learning, embedded systems, competitive programming, and more.
          </p>

          <div className="mb-8">
            <p className="text-lg text-[hsl(var(--foreground))]">
              I write{" "}
              <Link
                href="/blog"
                className="underline underline-offset-4 text-[hsl(var(--primary))]">
                blog posts
              </Link>{" "}
              about development, algorithms, design, and technology.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="mb-4 text-xl font-medium text-[hsl(var(--foreground))]">
              Find me on
            </h2>
            <div className="flex flex-wrap gap-4">
              <SocialLink
                href="https://github.com/gw-dg"
                icon={<Github className="h-5 w-5" />}
                label="GitHub"
              />
              <SocialLink
                href="https://x.com/bhaskar__jha"
                icon={<Twitter className="h-5 w-5" />}
                label="Twitter"
              />
              <SocialLink
                href="https://www.linkedin.com/in/bhaskar-jha-89226a218/"
                icon={<LinkedinIcon className="h-5 w-5" />}
                label="Linkedin"
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-2 text-xl font-medium text-[hsl(var(--foreground))]">
              Or mail me at
            </h2>
            <Link
              href="mailto:bhaskar2004jha@gmail.com"
              className="flex items-center gap-2 text-[hsl(var(--foreground))] hover:text-[hsl(var(--muted-foreground))]">
              <Mail size={20} />
              <span>bhaskar2004jha@gmail.com</span>
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
          <p>© {new Date().getFullYear()} • bhaskar</p>
        </footer>
      </div>
    </div>
  );
}
