import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AnimatedBackground from "@/components/animated-background";
import { Analytics } from "@vercel/analytics/next";
import "katex/dist/katex.min.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Bhaskar Jha - Developer & Designer",
    template: "%s | Bhaskar Jha",
  },
  description:
    "Simple Portfolio Website showcasing development projects, blog posts, and technical expertise",
  applicationName: "Bhaskar Jha Portfolio",
  authors: [{ name: "Bhaskar Jha", url: "https://github.com/gw-dg" }],
  creator: "Bhaskar Jha",
  publisher: "Bhaskar Jha",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "Bhaskar Jha",
    "portfolio",
    "developer",
    "designer",
    "web development",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "blog",
    "projects",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bhaskar Jha",
    title: "Bhaskar Jha - Developer & Designer",
    description:
      "Simple Portfolio Website showcasing development projects, blog posts, and technical expertise",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@bhaskar__jha",
    site: "@bhaskar__jha",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "xJ3pZHVVmsSmWD_XNvywqNJTh_PF6yoSRxBrI2NaWYY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//vercel.live" />
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//twitter.com" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bhaskar Jha",
              jobTitle: "Developer & Designer",
              description:
                "Passionate developer and designer focused on creating beautiful, functional experiences",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              sameAs: [
                "https://github.com/gw-dg",
                "https://x.com/bhaskar__jha",
                "https://www.linkedin.com/in/bhaskar-jha-89226a218/",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Palanam Technologies",
              },
              knowsAbout: [
                "Web Development",
                "React",
                "JavaScript",
                "Machine Learning",
                "Data Structures",
                "Algorithms",
                "Deep Learning",
                "Embedded Systems",
                "Competitive Programming",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          {/* Background color layer */}
          <div className="fixed inset-0 -z-20 bg-[hsl(var(--background))]" />
          {/* Animated canvas layer */}
          <AnimatedBackground />
          {/* Main content */}
          <div className="relative z-10">{children}</div>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
