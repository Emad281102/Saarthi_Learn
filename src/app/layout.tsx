import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Saarthi-Learn - AI Powered E-Learning Platform",
  description: "An AI powered elearning platform to provide online education to rural students in their native tongue",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@geist-ui/font@latest/geist-font.css" />
        <style>{`
html {
  font-family: 'Geist', sans-serif;
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
