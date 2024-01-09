import Image from "next/image"
import Link from "next/link"

import GenreDropdown from "@/components/genre-dropdown"
import SearchInput from "@/components/search-input"
import ThemeToggle from "@/components/theme-toggler"

// ⭐️ Check your HTML that is semantic and accessible
// ⭐️ Change between sticky and fixed properties in testing
export default function Header() {
  return (
    <header className="fixed top-0 z-20 flex w-full items-center justify-between bg-gradient-to-t from-gray-200/0 via-gray-900/25 to-gray-900 p-5 backdrop-blur-sm">
      <Link href="/" className="mr-10">
        <Image
          src="/logo.png"
          alt="logo"
          width={120}
          height={100}
          className="cursor-pointer invert-0 dark:invert"
          priority
        />
      </Link>

      <div className="flex gap-2">
        <GenreDropdown />
        <SearchInput />
        <ThemeToggle />
      </div>
    </header>
  )
}
