import { notFound } from 'next/navigation';

type Props = {
  params: {
    term: string;
  };
  searchParams: string;
};

export default function SearchPage({ params: { term } }: Props) {
  if (!term) notFound(); // ⭐️ Use the notFound helper

  const updateTerm = decodeURI(term);
  return (
    <div>
      <p>Search Page {updateTerm}</p>
    </div>
  );
}
