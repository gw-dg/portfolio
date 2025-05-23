import NavBar from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// Metadata for the projects page
export const metadata: Metadata = {
  title: "Projects | Bhaskar Jha",
  description:
    "Explore my featured projects including movie discovery apps, note-taking tools, ML-based disease prediction, typing speed tests, and IoT solutions using React, Node.js, Python, and more.",
  keywords: [
    "projects",
    "portfolio",
    "web development",
    "React",
    "JavaScript",
    "Machine Learning",
    "IoT",
    "Firebase",
    "Node.js",
    "Python",
  ],
  authors: [{ name: "Bhaskar Jha" }],
  openGraph: {
    title: "Projects | Bhaskar Jha",
    description:
      "Explore my featured projects including movie discovery apps, note-taking tools, ML-based disease prediction, typing speed tests, and IoT solutions.",
    type: "website",
    url: "/projects",
    siteName: "Bhaskar Jha",
    images: [
      {
        url: new URL(
          "/api/og?title=Projects&description=Web Development, Machine Learning, and IoT Solutions&tags=React,JavaScript,Python,Machine Learning,IoT",
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        ).toString(),
        width: 1200,
        height: 630,
        alt: "Bhaskar Jha's Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Bhaskar Jha",
    description:
      "Explore my featured projects including movie discovery apps, note-taking tools, ML-based disease prediction, and more.",
    creator: "@bhaskar__jha",
    images: [
      new URL(
        "/api/og?title=Projects&description=Web Development, Machine Learning, and IoT Solutions&tags=React,JavaScript,Python,Machine Learning,IoT",
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      ).toString(),
    ],
  },
  alternates: {
    canonical: "/projects",
  },
};

// Project data
const projects = [
  {
    id: 1,
    title: "To All The Films",
    description: `Movie discovery app using React, Firebase, and the TMDB API, allowing users to explore
films, view detailed information, and receive personalized recommendations based on their preferences and watch
history.`,
    tags: ["React", "Javascript", "Firebase", "Machine Learning", "Pinecone"],
    github: "https://github.com/gw-dg/to-all-the-films",
    live: "https://to-all-the-films.vercel.app/",
    featured: true,
  },
  {
    id: 2,
    title: "PasteBox",
    description: "Save your Notes, Code snippets for last minute revision",
    tags: [
      "React",
      "JavaScript",
      "Tailwind",
      "Express",
      "Mongodb",
      "Passportjs",
    ],
    github: "https://github.com/gw-dg/pastebox",
    live: "https://save-your-last-note.vercel.app/",
    featured: true,
  },
  {
    id: 3,
    title: "DeepDiagnose",
    description:
      "Machine Learning based Disease Prediction based on Symptoms. ",
    tags: ["Python", "Next.js", "FastAPI", "Machine Learning"],
    github: "https://github.com/gw-dg/DeepDiagnoseFrontend",
    live: "https://deepdiagnose.vercel.app/",
    featured: false,
  },
  {
    id: 4,
    title: "Zen-Type",
    description: "Minimalist Typing Speed testing application",
    tags: ["React", "Firebase", "ChartJs"],
    github: "https://github.com/gw-dg/zen-type",
    live: "https://zen-type.netlify.app/",
    featured: false,
  },
  {
    id: 5,
    title: "MQTT Server",
    description:
      "An IoT project demonstrating a basic MQTT broker setup using a Raspberry Pi as the server and NodeMCU as the client to publish and subscribe to messages over a local network.",
    tags: ["IoT", "MQTT", "Raspberry Pi", "NodeMCU"],
    github: "",
    live: "",
    featured: false,
  },
];

export default function ProjectsPage() {
  // Separate featured projects
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="container relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-8">
        <NavBar />

        <main className="flex-1 py-12">
          <h1 className="mb-8 text-4xl font-bold text-[hsl(var(--foreground))]">
            Projects
          </h1>

          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-medium text-[hsl(var(--foreground))]">
              Featured Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredProjects.map((project) => (
                <Card key={project.id} className="theme-card theme-card-hover">
                  <CardHeader>
                    <CardTitle className="text-[hsl(var(--card-foreground))]">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-[hsl(var(--muted-foreground))]">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="theme-badge">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </Link>
                    {project.live && (
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-medium text-[hsl(var(--foreground))]">
              Other Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {otherProjects.map((project) => (
                <Card key={project.id} className="theme-card theme-card-hover">
                  <CardHeader>
                    <CardTitle className="text-[hsl(var(--card-foreground))]">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-[hsl(var(--muted-foreground))]">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="theme-badge">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </Link>
                    {project.live && (
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <footer className="py-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
          <p>© {new Date().getFullYear()} • bhaskar</p>
        </footer>
      </div>
    </div>
  );
}
