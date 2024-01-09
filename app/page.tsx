import { getPopular, getTopRated, getUpcoming } from "@/lib/api/movies"
import BannerWrapper from "@/components/carousels/banner-wrapper"
import MoviesCarousel from "@/components/carousels/movies"

export default async function Home() {
  // 👇🏻 here we get movies!
  const upcoming = await getUpcoming()
  const topRated = await getTopRated()
  const popular = await getPopular()

  return (
    <main className="">
      <BannerWrapper />
      <div className="flex flex-col gap-2 xl:-mt-48">
        <MoviesCarousel movies={upcoming} title="Upcoming" />
        <MoviesCarousel movies={topRated} title="Top Rated" />
        <MoviesCarousel movies={popular} title="Popular" />
      </div>
    </main>
  )
}
