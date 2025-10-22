import type React from "react"
import type { Metadata } from "next"
import Wayni from "@icons/waynilogo.svg"


import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { Suspense } from "react"

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  // variable: "--font-inter", // si querés usarla como CSS var
});

export const metadata: Metadata = {
  title: "WayniWallet - Digital Wallet App",
  description: "Modern digital wallet for transfers and payments",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={null}>
          <Providers>
            <Wayni className="h-15 w-[50vw] text-primary-foreground absolute right-[0] top-0" />
            {children}
        
            <Toaster />
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
