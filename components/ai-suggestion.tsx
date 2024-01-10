"use client"

import useSWR from "swr"

type Props = {
  term: string
}

const fetcher = (term: string) =>
  fetch("/api/suggestions?term=" + term).then((res) => res.json())

export default function AiSuggestion({ term }: Props) {
  const { data, error, isLoading, isValidating } = useSWR(
    "suggestions",
    () => fetcher(term),
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  )

  const generateText = () => {
    if (isLoading || isValidating)
      return (
        <article className="flex items-center justify-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white" />
          <div>
            <p className="text-sm text-gray-400">OpenAI is thinking...</p>
            <div className="h-3 w-full animate-pulse rounded-full bg-secondary" />
          </div>
        </article>
      )

    if (error) return <>Error...</>
    if (!data) return <>No data</>

    return (
      <article className="flex items-center justify-center gap-3">
        <div className="h-8 w-8 shrink-0 animate-pulse rounded-full border-2 border-white bg-gradient-to-t from-white" />
        <div>
          <p className="text-sm text-gray-400">OpenAI Suggests:</p>
          <p className="text-sm antialiased">{data.message}</p>
        </div>
      </article>
    )
  }

  return (
    <div className="flex items-center space-x-5 px-10">{generateText()}</div>
  )
}
