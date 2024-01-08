import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
};

export default function GenrePage({
  params: { id },
  searchParams: { genre },
}: Props) {
  if (!id) notFound(); // ⭐️ Use the notFound helper

  const updateTerm = decodeURI(id);
  return (
    <div>
      <p>
        Genre Page {updateTerm} and {genre}
      </p>
    </div>
  );
}
