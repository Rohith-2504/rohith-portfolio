import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display-next",
});

export const metadata: Metadata = {
  title: "Rohith Reddy — AI Engineer",
  description:
    "The digital operating system of an AI engineer. Rohith Reddy builds AI products, full-stack systems, and production RAG pipelines.",
  keywords: [
    "Rohith Reddy",
    "AI Engineer",
    "Full Stack Developer",
    "RAG",
    "FastAPI",
    "React",
    "Gopafy",
  ],
  icons: {
    icon: [{ url: "/icon.webp", type: "image/webp" }],
    apple: [{ url: "/apple-icon.webp", type: "image/webp" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Rohith Reddy — AI Engineer",
    description: "Premium digital identity of an AI engineer building products that matter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={display.variable}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-cream antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
