"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <h1 className="text-lg font-semibold">ss</h1>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/chat" className="text-sm font-medium hover:underline">
            Chat
          </Link>
          <Link href="/admin" className="text-sm font-medium hover:underline">
            Admin
          </Link>
          <Link href="/training" className="text-sm font-medium hover:underline">
            Training Data
          </Link>
        </nav>
      </div>
    </header>
  )
}
