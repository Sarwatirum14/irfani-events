// app/components/Navbar.js
'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end space-x-6">
        <Link href="/" className="hover:text-pink-500 transition">Home</Link>
        <Link href="/#about" className="hover:text-pink-500 transition">About us</Link>
        <Link href="/#events" className="hover:text-pink-500 transition">Event</Link>
        <Link href="/gallery" className="hover:text-pink-500 transition">Gallery</Link>
        <Link href="/contact" className="hover:text-pink-500 transition">Contact Us</Link>
        <Link href="/admin" className="hover:text-pink-500 transition">Admin Login</Link>
        <Link href="/booking">
          <button className="border-2 border-white border-r-4 p-0.5 hover:text-pink-500 transition">
            BOOK NOW!
          </button>
        </Link>
      </div>
    </nav>
  );
}
