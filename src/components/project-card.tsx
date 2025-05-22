import type { ReactNode } from "react";

interface ProjectCardProps {
  name: string;
  icon: ReactNode;
  link: string;
}

export default function ProjectCard({ name, icon, link }: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] hover:bg-[hsl(var(--muted))] dark:hover:bg-[hsl(var(--accent))] px-3 py-1 rounded-full text-sm transition-colors cursor-pointer border border-[hsl(var(--border))]">
      {icon}
      <span>{name}</span>
    </a>
  );
}
