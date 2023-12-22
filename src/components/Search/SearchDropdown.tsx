import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useOutsideClick from "../../hooks/useOutsideClick";

import { MovieResult } from "@/lib/types/types";
import { StarIcon } from "@heroicons/react/24/solid";

export default function SearchDropdown({
  movies,
  closeSearch,
}: {
  movies: MovieResult[];
  closeSearch: VoidFunction;
}) {
  const [dropdownActive, setDropDownActive] = useState(false);
  const dropdown = useRef(null);

  useEffect(() => {
    setDropDownActive(true);
  }, [movies]);

  useOutsideClick(dropdown, () => {
    setDropDownActive(false);
  });

  const handleClick = () => {
    closeSearch();
    setDropDownActive(false);
  };

  return (
    <div
      className={`${
        dropdownActive
          ? "max-h-[300px] overflow-y-scroll md:max-h-[600px]"
          : "hidden"
      }`}
    >
      {movies?.length > 0 ? (
        <ul ref={dropdown} className={"block w-full"}>
          {movies.map((movie) => (
            <li
              key={movie.id}
              className=" border-t-2 border-slate-600 bg-slate-800 hover:bg-slate-600"
            >
              <Link
                className="flex p-2"
                onClick={handleClick}
                href={`/movies/${movie.id}`}
              >
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
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
