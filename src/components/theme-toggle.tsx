"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    // Toggle based on the current resolved theme
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 dark:bg-white/10 bg-gray-200 dark:text-white text-gray-900 dark:border-white/20 border-gray-300 flex items-center justify-center dark:hover:bg-white/20 hover:bg-gray-300 dark:hover:border-white/30 hover:border-gray-400 transition-colors"
      aria-label="Toggle theme">
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
