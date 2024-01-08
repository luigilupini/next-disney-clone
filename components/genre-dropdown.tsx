import Link from "next/link"
import { Genres } from "@/typings"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import DropdownWrapper from "@/components/genre-dropdown-animate"

export default async function GenreDropdown() {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en"
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.MOVIE_API_ACCESS_TOKEN}`,
    },
    // ⭐️ Cache setting per request for this component.
    // Presentational info like a collection of genres, cache it for long durations.
    // Invalidated after 24 hours 'MISS' and revalidated on the next request.
    // All users will get the same cached 'HIT' response.
    // If you have a million users, they will all get the same 'HIT' response.
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  }
  const response = await fetch(url, options)
  // prettier-ignore
  const data = await response.json() as Genres

  const genres = data.genres.map((genre) => (
    <DropdownMenuItem className="cursor-pointer" key={genre.id}>
      <Link href={`/genre/${genre.id}?genre=${genre.name}`}>{genre.name}</Link>
    </DropdownMenuItem>
  ))

  return <DropdownWrapper>{genres}</DropdownWrapper>
}
