import type { Metadata } from "next"
import { Karla } from "next/font/google"
import ProviderTree from "@/context/provider-tree"

import Header from "@/components/header"

import "@/styles/globals.css"

const font = Karla({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Disney+ Clone",
  description: "This is a clone of Disney+ services",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font.className} dark:bg-[#1A1C29]`}>
        <ProviderTree>
          <Header />
          {children}
        </ProviderTree>
      </body>
    </html>
  )
}
