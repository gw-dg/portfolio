"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
  resolvedTheme: "dark",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Cookie utility functions
const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  // Function to determine the actual theme based on system preference
  const resolveTheme = (themeValue: Theme): "dark" | "light" => {
    if (themeValue === "system") {
      if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      return "dark";
    }
    return themeValue;
  };

  // Function to update document class
  const updateDocumentClass = (themeToApply: "dark" | "light") => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(themeToApply);
      root.setAttribute("data-theme", themeToApply);
      root.style.colorScheme = themeToApply;
    }
  };

  // Initialize theme from cookie on mount
  useEffect(() => {
    const storedTheme = getCookie(storageKey) as Theme;

    if (
      storedTheme &&
      (storedTheme === "dark" ||
        storedTheme === "light" ||
        storedTheme === "system")
    ) {
      setTheme(storedTheme);
      const resolved = resolveTheme(storedTheme);
      setResolvedTheme(resolved);
      updateDocumentClass(resolved);
    } else {
      // First time visitor - set dark as default and save to cookie
      setTheme("dark");
      setResolvedTheme("dark");
      setCookie(storageKey, "dark");
      updateDocumentClass("dark");
    }

    setMounted(true);
  }, [storageKey]);

  // Listen for system theme changes when theme is "system"
  useEffect(() => {
    if (!mounted) return;

    if (theme === "system" && typeof window !== "undefined") {
      const systemThemeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      const updateSystemTheme = (e: MediaQueryListEvent) => {
        const newResolvedTheme = e.matches ? "dark" : "light";
        setResolvedTheme(newResolvedTheme);
        updateDocumentClass(newResolvedTheme);
      };

      systemThemeMediaQuery.addEventListener("change", updateSystemTheme);
      return () =>
        systemThemeMediaQuery.removeEventListener("change", updateSystemTheme);
    }
  }, [theme, mounted]);

  // Update resolved theme when theme changes
  useEffect(() => {
    if (!mounted) return;

    const newResolvedTheme = resolveTheme(theme);
    setResolvedTheme(newResolvedTheme);
    updateDocumentClass(newResolvedTheme);
  }, [theme, mounted]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: (newTheme: Theme) => {
      // Set cookie immediately and synchronously
      setCookie(storageKey, newTheme);

      // Update state
      setTheme(newTheme);

      // Force immediate DOM update
      const resolved = resolveTheme(newTheme);
      setResolvedTheme(resolved);
      updateDocumentClass(resolved);

      // Debug log
      // console.log(`Theme provider: set ${newTheme}, resolved to ${resolved}`);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
