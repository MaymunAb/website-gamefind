import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Azure GameFind - Bedava PC Oyunları",
  description: "İstediğin oyunları indir!",
  generator: "azure-team",
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7042796764932154" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
