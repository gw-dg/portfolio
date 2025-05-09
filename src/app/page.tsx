import Link from "next/link";
import { Github, LinkedinIcon, Mail, Twitter, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/animated-background";
import SocialLink from "@/components/social-link";
import ProjectCard from "@/components/project-card";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8">
        {/* Header/Logo */}
        <header className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold">
            <span className="font-serif italic">GwdG</span>
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/blog" className="hover:text-gray-300">
              Blog
            </Link>
            <Link href="/projects" className="hover:text-gray-300">
              Projects
            </Link>
            {/* <Link href="/talks" className="hover:text-gray-300">
              Talks
            </Link> */}
            <a
              href="https://drive.google.com/file/d/1qBWrBnLxzGau2YwkLf8PsMkTQ-_AwZtx/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300">
              Resume
            </a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col justify-center py-12">
          <h1 className="mb-6 text-5xl font-bold">Bhaskar Jha</h1>

          <p className="mb-8 text-xl">
            Hey! I&apos;m a passionate developer and designer focused on
            creating beautiful, functional experiences.
          </p>

          <div className="mb-8">
            <h2 className="mb-2 text-lg font-medium text-gray-300">
              Working at
            </h2>
            <div className="flex items-center space-x-2">
              <span className="rounded-md bg-white/10 px-3 py-1">
                Palanam Technologies
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-2 text-lg font-medium text-gray-300">
              Creator of
            </h2>
            <div className="flex flex-wrap gap-2">
              {/* <span className="rounded-md bg-white/10 px-3 py-1">
                To All The Films
              </span>
              <span className="rounded-md bg-white/10 px-3 py-1">PasteBox</span> */}
              {/* <span className="rounded-md bg-white/10 px-3 py-1">
                Project Three
              </span> */}
              <ProjectCard
                name="To All The Films"
                icon={<Zap className="h-4 w-4" />}
              />
              <ProjectCard name="PasteBox" icon={<Zap className="h-4 w-4" />} />
              {/* <ProjectCard
                name="Project Three"
                icon={<Zap className="h-4 w-4" />}
              /> */}
            </div>
          </div>

          <p className="mb-8 text-lg">
            Dreaming up cool ideas and making them come true is where my passion
            lies. I am enthusiastic about building tools that help myself and
            others to be more productive and enjoy the process of crafting.
          </p>

          <div className="mb-8">
            <p className="text-lg">
              I{" "}
              {/* <Link href="/talks" className="underline underline-offset-4">
                talks
              </Link>{" "} */}
              write{" "}
              <Link href="/blog" className="underline underline-offset-4">
                blog posts
              </Link>{" "}
              about development, design, and technology.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="mb-4 text-xl font-medium">Find me on</h2>
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
            <h2 className="mb-2 text-xl font-medium">Or mail me at</h2>
            <Link
              href="mailto:hello@example.com"
              className="flex items-center gap-2 hover:text-gray-300">
              <Mail size={20} />
              <span>bhaskar2004jha@gmail.com</span>
            </Link>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-lg">
              If you enjoy my work and find it useful, consider sponsoring me to
              help keep Open Source sustainable. Thank you!
            </p>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10 hover:text-white">
              Sponsor
            </Button>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} • bhaskar</p>
        </footer>
      </div>
    </div>
  );
}
