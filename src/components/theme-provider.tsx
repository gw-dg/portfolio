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
  resolvedTheme: "dark" | "light"; // Add resolved theme for consistent checking
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "dark", // Default to dark if not yet resolved
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");

  // Function to determine the actual theme based on system preference
  const resolveTheme = (themeValue: Theme): "dark" | "light" => {
    if (themeValue === "system") {
      if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      return "dark"; // Default to dark when window is not available
    }
    return themeValue;
  };

  useEffect(() => {
    // Only access localStorage after component has mounted (client-side)
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
      setResolvedTheme(resolveTheme(storedTheme));
    } else {
      // If no stored theme, initialize with default
      setResolvedTheme(resolveTheme(defaultTheme));
    }
  }, [storageKey, defaultTheme]);

  useEffect(() => {
    // Listen for system theme changes
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
  }, [theme]);

  // Function to update document class
  const updateDocumentClass = (themeToApply: "dark" | "light") => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;

      // First remove both classes
      root.classList.remove("light", "dark");

      // Then add the appropriate class
      root.classList.add(themeToApply);

      // Also set a data attribute for easier CSS targeting
      root.setAttribute("data-theme", themeToApply);
    }
  };

  useEffect(() => {
    // When theme changes, resolve and apply it
    const newResolvedTheme = resolveTheme(theme);
    setResolvedTheme(newResolvedTheme);
    updateDocumentClass(newResolvedTheme);
  }, [theme]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
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
