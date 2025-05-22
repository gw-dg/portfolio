"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    {
      name: "Resume",
      href: "https://drive.google.com/file/d/1qBWrBnLxzGau2YwkLf8PsMkTQ-_AwZtx/view?usp=sharing",
      external: true,
    },
  ];

  return (
    <header className="flex items-center justify-between py-4">
      <Link
        href="/"
        className="text-2xl font-bold text-[hsl(var(--foreground))]">
        <span className="font-serif italic">GwdG</span>
      </Link>

      <div className="flex items-center gap-6">
        <nav className="space-x-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={cn(
                "hover:text-[hsl(var(--muted-foreground))] transition-colors text-[hsl(var(--foreground))]",
                pathname === item.href &&
                  "font-medium text-[hsl(var(--primary))]"
              )}>
              {item.name}
            </Link>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
