import Image from "next/image";
import Link from "next/link";

export default function DiscoverCard({
  id,
  title,
  poster,
}: {
  id: number;
  title: string;
  poster: string;
}) {
  const src = `https://image.tmdb.org/t/p/w200${poster}`;

  return poster ? (
    <Link
      href={`/discover/${id}`}
      className={
        "card-shadow relative rounded  hover:cursor-pointer hover:outline  hover:outline-2"
      }
    >
      <Image
        height={225}
        width={150}
        className="h-auto w-full rounded"
        src={src}
        alt={title}
      />
    </Link>
  ) : null;
}
