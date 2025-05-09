import Link from "next/link";
import { Github, LinkedinIcon, Mail, Twitter, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/animated-background";
import SocialLink from "@/components/social-link";
import ProjectCard from "@/components/project-card";
import NavBar from "@/components/nav-bar";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden dark:text-white text-gray-900">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8">
        {/* Header with NavBar component */}
        <NavBar />

        {/* Main Content */}
        <main className="flex flex-1 flex-col justify-center py-12">
          <h1 className="mb-6 text-5xl font-bold dark:text-white text-gray-900">
            Bhaskar Jha
          </h1>

          <p className="mb-8 text-xl dark:text-white text-gray-900">
            Hey! I&apos;m a passionate developer and designer focused on
            creating beautiful, functional experiences.
          </p>

          <div className="mb-8">
            <h2 className="mb-2 text-lg font-medium dark:text-gray-300 text-gray-700">
              Working at
            </h2>
            <div className="flex items-center space-x-2">
              <span className="rounded-md dark:bg-white/10 bg-gray-200 px-3 py-1 dark:text-white text-gray-900">
                Palanam Technologies
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-2 text-lg font-medium dark:text-gray-300 text-gray-600">
              Creator of
            </h2>
            <div className="flex flex-wrap gap-2">
              <ProjectCard
                name="To All The Films"
                icon={<Zap className="h-4 w-4 text-gray-400" />}
                link="https://to-all-the-films.vercel.app/"
              />

              <ProjectCard
                name="PasteBox"
                icon={<Zap className="h-4 w-4 text-gray-400" />}
                link="https://save-your-last-note.vercel.app/"
              />
            </div>
          </div>

          <p className="mb-8 text-lg dark:text-white text-gray-900">
            Dreaming up cool ideas and making them come true is where my passion
            lies. I am enthusiastic about building tools that help myself and
            others to be more productive and enjoy the process of crafting.
          </p>

          <div className="mb-8">
            <p className="text-lg dark:text-white text-gray-900">
              I write{" "}
              <Link href="/blog" className="underline underline-offset-4">
                blog posts
              </Link>{" "}
              about development, design, and technology.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="mb-4 text-xl font-medium dark:text-white text-gray-900">
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
            <h2 className="mb-2 text-xl font-medium dark:text-white text-gray-900">
              Or mail me at
            </h2>
            <Link
              href="mailto:bhaskar2004jha@gmail.com"
              className="flex items-center gap-2 dark:text-white text-gray-900 hover:text-gray-600 dark:hover:text-gray-300">
              <Mail size={20} />
              <span>bhaskar2004jha@gmail.com</span>
            </Link>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-lg dark:text-white text-gray-900">
              If you enjoy my work and find it useful, consider sponsoring me to
              help keep Open Source sustainable. Thank you!
            </p>
            <Button
              variant="outline"
              className="dark:border-white/20 border-gray-800/20 dark:hover:bg-white/10 hover:bg-gray-800/10 dark:text-white text-gray-900 dark:hover:text-white hover:text-gray-900">
              Sponsor
            </Button>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 text-center text-sm dark:text-gray-400 text-gray-500">
          <p>© {new Date().getFullYear()} • bhaskar</p>
        </footer>
      </div>
    </div>
  );
}
