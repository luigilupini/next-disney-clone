import { notFound } from "next/navigation"

import { getDiscoverMovie } from "@/lib/api/movies"
import MoviesCarousel from "@/components/carousels/movies"

type Props = {
  params: {
    id: string
  }
  searchParams: {
    genre: string
  }
}

export default async function GenrePage({
  params: { id },
  searchParams: { genre },
}: Props) {
  if (!id) notFound() // ⭐️ Use the notFound helper

  const updateTerm = decodeURI(id)
  const movies = await getDiscoverMovie(id)
  return (
    <div className="mx-auto max-w-7xl">
      <div className="xl:mt-42 mt-32 flex flex-col space-y-5">
        <h1 className="px-10 text-6xl font-bold">Results for {genre}</h1>

        {/* <AIAzureSuggestion term={genre} /> */}
        {/* <AISuggestion term={genre} /> */}
        <MoviesCarousel title={`Genre`} movies={movies} vertical />
      </div>
    </div>
  )
}
