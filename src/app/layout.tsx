import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/NavBar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Home Game Network",
  description: "Find and host poker games near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen">
        <NavBar />
        <main className="pt-6 px-4 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
