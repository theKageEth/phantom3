import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://phantom3.dev"),
  title: "Phantom3 - Web Development Studio | 3D Interactive Experiences",
  description:
    "Phantom3 is a cutting-edge web development studio specializing in ethereal digital experiences using React, Next.js, Three.js, and modern web technologies. We craft haunting beautiful web applications with ghostly precision.",
  keywords: [
    "web development",
    "3D web experiences",
    "React",
    "Next.js",
    "Three.js",
    "interactive design",
    "frontend development",
    "web studio",
    "digital experiences",
  ],
  authors: [{ name: "Phantom3 Team" }],
  creator: "Phantom3",
  publisher: "Phantom3",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://phantom3.dev",
    siteName: "Phantom3",
    title: "Phantom3 - Web Development Studio",
    description:
      "Crafting ethereal digital experiences with cutting-edge technology. We bring your visions to life with ghostly precision.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Phantom3 - Web Development Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phantom3 - Web Development Studio",
    description:
      "Crafting ethereal digital experiences with cutting-edge technology.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
