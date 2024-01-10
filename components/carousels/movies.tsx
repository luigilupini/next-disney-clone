import Image from "next/image"
import { Movie } from "@/typings"

import { getImagePath } from "@/lib/api/movies"
import { cn } from "@/lib/utils"

type Props = { title?: string; movies: Movie[]; vertical?: boolean }

export default function MoviesCarousel({ title, movies, vertical }: Props) {
  const moviesList = vertical
    ? movies.map((movie) => <MovieInfo key={movie.id} movie={movie} vertical />)
    : movies.map((movie) => <MovieImage key={movie.id} movie={movie} />)

  return (
    <section className="z-40">
      <h2 className="px-10 py-2 text-xl font-bold">{title}</h2>
      <div
        className={cn(
          "flex space-x-4 overflow-scroll scrollbar-hide px-5 lg:px-10 py-5",
          vertical && "flex-col space-x-0 space-y-12",
        )}
      >
        {moviesList}
      </div>
    </section>
  )
}

function MovieImage({ movie }: { movie: Movie }) {
  return (
    <article className="relative shrink-0 transform-gpu cursor-pointer overflow-hidden rounded-md transition-all duration-200 ease-out hover:scale-105 hover:drop-shadow-lg">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-200/0 via-gray-900/20 to-gray-300 shadow-md dark:to-[#1A1C29]/80" />

      <p className="absolute bottom-5 left-5 z-20">{movie.title}</p>

      <Image
        className="h-44 w-fit object-cover object-center lg:min-w-[300px]"
        src={getImagePath(movie.backdrop_path || movie.poster_path)}
        key={movie.id}
        alt={movie.title}
        width={1920}
        height={1080}
        priority
      />
    </article>
  )
}

function MovieInfo({ movie, vertical }: { movie: Movie; vertical?: boolean }) {
  return (
    <article
      key={movie.id}
      className={cn(
        vertical &&
          "flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5",
      )}
    >
      <MovieImage movie={movie} />
      <div className="max-w-2xl">
        <p className="font-bold">
          {movie.title} ({movie.release_date?.split("-")[0]})
        </p>
        <hr className="mb-3" />
        <p className="text-[15px] font-light text-primary/80">
          {movie.overview}
        </p>
      </div>
    </article>
  )
}
