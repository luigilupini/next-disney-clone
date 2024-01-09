import { SearchResults } from "@/typings"

// ⭐️ Fetches data from an API using a URL with query parameters. The URL class
// is used for structured and error-free management of query parameters. More
// about the URL class: https://developer.mozilla.org/en-US/docs/Web/API/URL
async function fetchWithUrlDefaults(url: URL, cacheTime?: number) {
  // Default search parameters are set here to ensure consistent filtering
  // criteria across API requests. These parameters are used to exclude adult
  // content, include video data, sort results by popularity, set the language
  // to English, and define the page number.
  url.searchParams.set("include_adult", "false")
  url.searchParams.set("include_video", "false")
  url.searchParams.set("sort_by", "popularity.desc")
  url.searchParams.set("language", "en-US")
  url.searchParams.set("page", "1")

  // Additional implementation details...
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.MOVIE_API_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24, // default 24 hours
    },
  }

  const response = await fetch(url.toString(), options)
  const data = (await response.json()) as SearchResults
  return data
}

// ⭐️ Using the URL interface The URL interface is used to parse, construct,
// normalize, and encode URLs. It works by providing properties which allow you
// to easily read and modify the components of a URL. You normally create a new
// URL object by specifying the URL as a string when calling its constructor, or
// by providing a relative URL and a base URL. You can then easily read the
// parsed components of the URL or make changes to the URL.

// 📝 See the Instance properties
// https://developer.mozilla.org/en-US/docs/Web/API/URL#constructor

// > Example: searchParams (Read only)
// > A URLSearchParams object which can be used to access the individual query
// > parameters found in search. See Using URLSearchParams for details.
export async function getUpcoming() {
  const url = new URL("https://api.themoviedb.org/3/movie/upcoming")
  const data = await fetchWithUrlDefaults(url)

  return data.results
}

export async function getTopRated() {
  const url = new URL("https://api.themoviedb.org/3/movie/top_rated")
  const data = await fetchWithUrlDefaults(url)

  return data.results
}

export async function getPopular() {
  const url = new URL("https://api.themoviedb.org/3/movie/popular")
  const data = await fetchWithUrlDefaults(url)

  return data.results
}

// ⭐️ Using Query Params to filter results
// Conditional logic is used to add the `keywords` to our query parameter.
// Below will append our `keywords` that are (query params) to the url.
// We make use of the `set` method from our `URLSearchParams` interface.
// As MDN mentions `searchParams` is a property of the `URL` contractor.
export async function getDiscoverMovie(id?: string, keywords?: string) {
  // https://developer.themoviedb.org/reference/discover-movie
  const url = new URL(`https://api.themoviedb.org/3/discover/movie`)

  if (id) url.searchParams.set("with_genres", id)
  if (keywords) url.searchParams.set("with_keywords", keywords)

  const data = await fetchWithUrlDefaults(url)
  return data.results
}

export async function getSearchMovies(term: string) {
  // https://developer.themoviedb.org/reference/search-movie
  const url = new URL(`https://api.themoviedb.org/3/search/movie`)

  url.searchParams.set("query", term)
  url.searchParams.set("include_adult", "false")
  url.searchParams.set("language", "en-US")
  url.searchParams.set("page", "1")

  const data = await fetchWithUrlDefaults(url)
  return data.results
}

export function getImagePath(imagePath?: string, fullSize?: boolean) {
  return imagePath
    ? `http://image.tmdb.org/t/p/${fullSize ? "original" : "w500"}/${imagePath}`
    : "/placeholder.png"
}
