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
      <body className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen">
        <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-black to-gray-900 border-b border-[#4B9CD3] flex items-center justify-between px-8 py-3 shadow-lg shadow-[#4B9CD3]/10">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/logo.png" alt="Home Game Network Logo" width={48} height={48} className="rounded-full" />
            </Link>
            <span className="text-2xl font-bold text-[#4B9CD3]">Home Game Network</span>
          </div>
          <div className="flex-1 flex justify-center">
            <ul className="flex gap-6 text-lg font-medium">
              <li><Link href="/" className="hover:text-[#4B9CD3] transition duration-300">Home</Link></li>
              <li><Link href="/games" className="hover:text-[#4B9CD3] transition duration-300">Find Games</Link></li>
              <li><Link href="/host" className="hover:text-[#4B9CD3] transition duration-300">Host</Link></li>
              <li><Link href="/social" className="hover:text-[#4B9CD3] transition duration-300">Social</Link></li>
              <li><Link href="/profile" className="hover:text-[#4B9CD3] transition duration-300">Profile</Link></li>
              <li><Link href="/shop" className="hover:text-[#4B9CD3] transition duration-300">Shop</Link></li>
              <li><Link href="/subscription" className="hover:text-[#4B9CD3] transition duration-300">Subscription</Link></li>
            </ul>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <button className="px-5 py-2 border border-[#4B9CD3] text-[#4B9CD3] rounded-xl font-semibold hover:bg-[#4B9CD3] hover:text-black transition duration-300 shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30">Log In</button>
            </Link>
            <Link href="/signup">
              <button className="px-5 py-2 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black rounded-xl font-semibold hover:from-[#3A8BC2] hover:to-[#6AA2D5] transition duration-300 shadow-lg shadow-[#4B9CD3]/30 hover:shadow-xl hover:shadow-[#4B9CD3]/40">Sign Up</button>
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
