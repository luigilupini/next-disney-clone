import { getDiscoverMovie } from "@/lib/api/movies"
import BannerCarousel from "@/components/carousels/banner"

type Props = {
  id?: string
  keywords?: string
}

export default async function BannerWrapper({ id, keywords }: Props) {
  const movies = await getDiscoverMovie(id, keywords)
  return <BannerCarousel movies={movies} />
}
