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
      className="flex items-center gap-2 dark:bg-white/10 bg-gray-200 dark:hover:bg-white/15 hover:bg-gray-300 px-4 py-2 rounded-md transition-colors dark:text-white text-gray-900"
      target="_blank"
      rel="noopener noreferrer">
      {icon}
      <span>{label}</span>
    </Link>
  );
}
