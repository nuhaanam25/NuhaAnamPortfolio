import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "NUHA ANAM — Web Developer & AI Enthusiast",
  description:
    "I build modern, responsive and interactive websites that help businesses turn ideas into meaningful digital experiences.",
  keywords: [
    "Nuha Anam",
    "Web Developer",
    "Creative Developer",
    "AI Enthusiast",
    "Frontend Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Nuha Anam" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050505] text-[#F5F3F3] antialiased selection:bg-[#FF91A9] selection:text-[#050505] overflow-x-hidden font-sans">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
