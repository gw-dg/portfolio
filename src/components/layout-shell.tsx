"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${inter.className} antialiased`}>{children}</div>;
}
