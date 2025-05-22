"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 flex items-center justify-center 
                 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] 
                 hover:bg-[hsl(var(--muted))] dark:hover:bg-[hsl(var(--accent))] 
                 border border-[hsl(var(--border))] transition-colors"
      aria-label="Toggle theme">
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
