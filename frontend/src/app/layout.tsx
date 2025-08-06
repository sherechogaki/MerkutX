import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Akıllı Ders Platformu',
  description: 'Geleceğin üniversite sınıfı',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Navbar />
        <main className="p-6 bg-gray-50 min-h-screen">{children}</main>
      </body>
    </html>
  )
}
