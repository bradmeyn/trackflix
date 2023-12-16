import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBookmark } from "@fortawesome/pro-solid-svg-icons";
import { faBookmark as falStar } from "@fortawesome/pro-regular-svg-icons";

import Image from "next/image";
import Link from "next/link";

export default function Card({
  id,
  title,
  poster,
}: {
  id: number;
  title: string;
  poster: string;
}) {
  const src = `https://image.tmdb.org/t/p/w200${poster}`;

  return (

      <Link
        href={`/movies/${id}`}
        className={
          "card-shadow relative w-28 rounded-md transition-transform duration-300 hover:scale-105 hover:cursor-pointer hover:outline hover:outline-4 md:w-36 lg:w-48  xl:w-52"
        }
      >
        <Image
          height={100}
          width={200}

          className="h-auto w-full rounded"
          src={src}
          loader={({ src }) => src}
          alt={title}
        />
      </Link>

  );
}
