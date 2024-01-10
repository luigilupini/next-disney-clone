"use client"

import { PropsWithChildren } from "react"
import { ThemeProvider } from "@/context/theme"

import { Toaster } from "@/components/ui/toaster"

const ProviderTree = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      // enableSystem
      disableTransitionOnChange // ⭐️ A blur from dark to light mode
    >
      {children}
      <Toaster />
    </ThemeProvider>
  )
}

export default ProviderTree
