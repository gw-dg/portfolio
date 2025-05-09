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
      <Link href="/" className="text-2xl font-bold dark:text-white text-black">
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
                "dark:hover:text-gray-300 hover:text-gray-600 transition-colors dark:text-white text-black",
                pathname === item.href && "font-medium"
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
