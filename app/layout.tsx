import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "CodeNexus - Enhance Your Code With AI",
  description: "Transform your code into something extraordinary with Groq AI-powered enhancements",
  openGraph: {
    title: "CodeNexus - Enhance Your Code With AI",
    description: "Transform your code into something extraordinary with Groq AI-powered enhancements",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CodeNexus - AI Code Enhancement Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeNexus - Enhance Your Code With AI",
    description: "Transform your code into something extraordinary with Groq AI-powered enhancements",
    images: ["/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'