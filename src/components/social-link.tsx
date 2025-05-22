import Link from "next/link";
import type { ReactNode } from "react";

interface SocialLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export default function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors 
                 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] 
                 hover:bg-[hsl(var(--muted))] dark:hover:bg-[hsl(var(--accent))] 
                 border border-[hsl(var(--border))]"
      target="_blank"
      rel="noopener noreferrer">
      {icon}
      <span>{label}</span>
    </Link>
  );
}
