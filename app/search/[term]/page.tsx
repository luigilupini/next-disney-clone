import { notFound } from "next/navigation"

import { getPopular, getSearchMovies } from "@/lib/api/movies"
import MoviesCarousel from "@/components/carousels/movies"

type Props = {
  params: {
    term: string
  }
  searchParams: string
}

export default async function SearchPage({ params: { term } }: Props) {
  if (!term) notFound() // ⭐️ Use the notFound helper

  const updateTerm = decodeURI(term)

  const search = await getSearchMovies(updateTerm)
  const popular = await getPopular()

  return (
    <div className="mx-auto max-w-7xl">
      <div className="xl:mt-42 mt-32 flex flex-col space-y-5">
        <h1 className="px-10 text-6xl font-bold">Results for {updateTerm}</h1>
        <MoviesCarousel title="Movies" movies={search} vertical />
        <MoviesCarousel title="You may also like" movies={popular} />
      </div>
    </div>
  )
}
