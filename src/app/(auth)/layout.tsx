import React from 'react'

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="w-screen">
      {children}
    </main>
  )
}
