'use client'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Akıllı Ders Platformu</h1>
      <div className="space-x-4">
        <Link href="/" className="text-sm text-gray-700 hover:text-black">Ana Sayfa</Link>
        <Link href="/misyon-vizyon" className="text-sm text-gray-700 hover:text-black">Misyon & Vizyon</Link>
      </div>
    </nav>
  )
}