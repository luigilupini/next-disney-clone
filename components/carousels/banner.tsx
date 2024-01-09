"use client"

import Image from "next/image"
import { Movie } from "@/typings"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"

// ⭐️ Embla Carousel is a library agnostic, dependency free and lightweight
// carousel library. It aims to solve the hardest technical challenges with
// building carousels, and the rest is up to the user utilizing its highly
// extensible API and plugins. Embla Carousel works in all modern browsers.
// https://www.embla-carousel.com/get-started/react/
import { getImagePath } from "@/lib/api/movies"

Autoplay.globalOptions = { delay: 8000 }

export default function BannerCarousel({ movies }: { movies: Movie[] }) {
  // ⭐️ The component structure
  // Embla Carousel provides the handy useEmblaCarousel hook 🪝 for seamless
  // integration with React. A minimal setup requires an overflow wrapper and a
  // scroll container. Start by adding the following to your carousel:
  // prettier-ignore
  const [emblaRef] = useEmblaCarousel(
    { loop: true, duration: 100 },
    [ Autoplay(),]
  )

  return (
    <section
      // On large screens we need to pull up the margin!
      className="relative cursor-pointer overflow-hidden lg:-mt-40"
      ref={emblaRef}
    >
      <div className="flex">
        {movies.map((movie) => (
          <article key={movie.id} className="embla__slide relative min-w-0">
            <Image
              key={movie.id}
              src={getImagePath(movie.backdrop_path, true)}
              width={1920}
              height={1080}
              alt="banner"
              className="w-full object-cover object-center"
              priority
            />
            <div className="absolute left-0 top-0 z-20 mt-0 hidden h-full w-full space-y-5 bg-transparent bg-gradient-to-r from-gray-900/90 via-transparent to-transparent p-10 pt-40 text-white lg:mt-40 lg:inline xl:pt-52">
              <h2 className="z-50 max-w-xl text-5xl font-bold">
                {movie.title}
              </h2>
              <p className="line-clamp-3 max-w-xl">{movie.overview}</p>
            </div>
            <MaskGradient />
          </article>
        ))}
      </div>
    </section>
  )
}

const MaskGradient = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/25 to-gray-300 dark:to-[#1A1C29]" />
)
