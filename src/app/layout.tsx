import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Companies Act 2013 - Compliance Calculators",
  description:
    "Comprehensive online calculators for all statutory computations under the Companies Act, 2013",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-white`}
      >
        <nav className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
            <Link
              href="/"
              className="text-sm font-semibold text-white hover:text-blue-400 transition-colors"
            >
              CA 2013 Calculators
            </Link>
            <span className="ml-3 text-xs text-neutral-500 font-mono">
              Companies Act, 2013
            </span>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
