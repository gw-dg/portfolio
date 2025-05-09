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
      className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-4 py-2 rounded-md transition-colors"
      target="_blank"
      rel="noopener noreferrer">
      {icon}
      <span>{label}</span>
    </Link>
  );
}
