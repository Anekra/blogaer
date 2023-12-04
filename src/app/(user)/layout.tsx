// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
import React from 'react'

export default function UserLayout({children}: {children: React.ReactNode}) {
  return (
    <main>
      {/* <Navbar /> */}
        {children}
      {/* <Footer /> */}
    </main>
  )
}
