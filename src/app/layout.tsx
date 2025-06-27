import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from 'next/image';
import Link from 'next/link';

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
      <body className="bg-black text-white min-h-screen">
        <nav className="sticky top-0 z-50 w-full bg-black border-b border-gray-800 flex items-center justify-between px-8 py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/logo.png" alt="Home Game Network Logo" width={48} height={48} className="rounded-full" />
            </Link>
            <span className="text-2xl font-bold text-[#4B9CD3]">Home Game Network</span>
          </div>
          <div className="flex-1 flex justify-center">
            <ul className="flex gap-6 text-lg font-medium">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/games">Find Games</Link></li>
              <li><Link href="/host">Host</Link></li>
              <li><Link href="/profile">Profile</Link></li>
              <li><Link href="/shop">Shop</Link></li>
            </ul>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <button className="px-5 py-2 border border-[#4B9CD3] text-[#4B9CD3] rounded-md font-semibold hover:bg-[#4B9CD3] hover:text-black transition">Log In</button>
            </Link>
            <Link href="/signup">
              <button className="px-5 py-2 bg-[#4B9CD3] text-black rounded-md font-semibold hover:bg-white hover:text-[#4B9CD3] transition">Sign Up</button>
            </Link>
          </div>
        </nav>
        <main className="pt-6 px-4 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
