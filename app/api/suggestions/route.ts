// ⭐️ Fetches data from an API using a URL with query parameters. The URL class
// is used for structured and error-free management of query parameters. More
// about the URL class: https://developer.mozilla.org/en-US/docs/Web/API/URL
export async function GET(request: Request) {
  // The URLSearchParams interface can be used to build and manipulate the URL
  // query string. To get the search params from the current window's URL:
  const { searchParams } = new URL(request.url)
  const term = searchParams.get("term")
  // Remember `searchParams` is read only `URLSearchParams` object instance,
  // which can be used to access individual query prams like a `term`.
  const res = await fetch(
    `https://next-disney-clone-app.azurewebsites.net/api/getaisuggestion?term=${term}`,
    {
      method: "GET",
      next: {
        revalidate: 60 * 60 * 24,
      },
    },
  )

  const message = await res.text()

  return Response.json({ message })
}
