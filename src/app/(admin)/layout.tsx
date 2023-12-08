import Navbar from '@/lib/components/Navbar';
import Footer from '@/lib/components/Footer';
import React from 'react'

export default function AdminLayout({children}: {children: React.ReactNode}) {
  return (
    <main>
      <Navbar />
        {children}
      <Footer />
    </main>
  )
}
