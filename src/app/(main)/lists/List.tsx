import Image from "next/image";

import type { MovieResult } from "@/lib/types/types";

export default function List() {
  return <div></div>;
}

function ListItem({ movie }: { movie: MovieResult }) {
  return (
    <li
      key={movie.id}
      className=" border-t-2 border-slate-600 bg-slate-800 hover:bg-slate-600"
    >
      <div className="flex">
        <div className="w-32 p-1">
          <Image
            loader={({ src }) => src}
            className="h-auto w-full rounded"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.original_title}
          />
        </div>

        <div className="p-4">
          <h4 className="pb-1 text-lg font-semibold text-white md:text-xl lg:text-3xl">
            {movie.original_title}
          </h4>

          <div className="md:text-md pb-2 text-sm text-slate-300 lg:text-lg">
            {new Date(movie.release_date).getFullYear()}
          </div>
          <span className="text-md flex items-center md:text-lg lg:text-xl">
            <StarIcon className="mr-2 text-yellow-400" />
            <span>{Math.round(movie.vote_average * 10) / 10}</span>
          </span>
        </div>
      </div>
    </li>
  );
}
