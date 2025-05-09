"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
      <Link href="/" className="text-2xl font-bold">
        <span className="font-serif italic">GwdG</span>
      </Link>
      {/* <button
        onClick={() => router.back()}
        className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl text-base font-semibold shadow-md transition hover:bg-white/20 hover:border-white/30 hover:scale-105">
        ←
      </button> */}
      <nav className="hidden space-x-6 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "hover:text-gray-300 transition-colors",
              pathname === item.href && "text-white font-medium"
            )}>
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
