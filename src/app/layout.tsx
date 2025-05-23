import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AnimatedBackground from "@/components/animated-background";
import { Analytics } from "@vercel/analytics/next";
import "katex/dist/katex.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bhaskar Jha",
  description: "Simple Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          {/* Background color layer */}
          <div className="fixed inset-0 -z-20 bg-[hsl(var(--background))]" />
          {/* Animated canvas layer */}
          <AnimatedBackground />
          {/* Main content */}
          {children}
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
