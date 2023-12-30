"use client";

import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { MovieResult } from "@/lib/types/types";
import { searchMovies } from "@services/tmdbService";
import useOutsideClick from "../hooks/useOutsideClick";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import Link from "next/link";
import Image from "next/image";

import { StarIcon } from "@heroicons/react/24/solid";

export default function SearchModal() {
  const [modalActive, setModalActive] = useState(false);
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchContainer = useRef(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const getMovies = useCallback(async () => {
    if (searchQuery.trim().length > 0) {
      const data = await searchMovies(searchQuery);
      setMovies(data);
    } else {
      setMovies([]);
    }
  }, [searchQuery]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value.trim());
  };

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      getMovies();
    } else {
      setMovies([]);
    }
  }, [searchQuery, getMovies]);

  useOutsideClick(searchContainer, () => {
    if (modalActive) {
      closeSearch();
    }
  });

  const focusInput = () => {
    searchInput.current?.focus();
  };

  const closeSearch = () => {
    setModalActive(false);
  };

  const activateSearch = (e: MouseEvent) => {
    e.stopPropagation();
    setModalActive(true);
  };

  return (
    <>
      {modalActive ? (
        <div className="fixed top-0 left-0 z-50 h-full w-full bg-slate-900/30 p-0 backdrop-blur-md  ">
          <div
            ref={searchContainer}
            className=" mx-10 mt-20 md:mx-auto md:max-w-3xl "
          >
            <div
              className="relative  flex flex-1 items-center rounded"
              onClick={focusInput}
            >
              <input
                autoFocus
                ref={searchInput}
                placeholder="Search movies"
                className={`w-full bg-slate-700 py-3 pl-12 text-lg text-white outline-0 md:text-xl ${
                  movies.length > 0 ? "rounded-t" : "rounded"
                }`}
                onChange={handleChange}
              />
              <MagnifyingGlassIcon className="absolute ml-4 w-5 text-lg md:text-xl" />
              <span
                className="absolute right-4 z-50 cursor-pointer text-xl text-white"
                onClick={closeSearch}
              ></span>
            </div>
            {movies?.length > 0 ? (
              <ResultsDropdown movies={movies} closeSearch={closeSearch} />
            ) : (
              <EmptySearch searchQuery={searchQuery} />
            )}
          </div>
        </div>
      ) : (
        <SearchButton activateSearch={activateSearch} />
      )}
    </>
  );
}

function SearchButton({ activateSearch }) {
  return (
    <>
      <button
        className="relative mx-8 flex items-center rounded-md bg-slate-700 py-2 px-4 text-slate-300 hover:bg-slate-600 hover:text-white md:max-w-md md:flex-1 lg:max-w-xl "
        onClick={activateSearch}
      >
        <MagnifyingGlassIcon className="mr-3 w-5" />
        <span className="hidden md:inline">Search movies</span>
      </button>
      <MagnifyingGlassIcon
        className="focus:white ml-auto mr-5 w-5 cursor-pointer text-xl hover:text-white md:hidden"
        onClick={activateSearch}
      />
    </>
  );
}

function ResultsDropdown({
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
      <ul ref={dropdown} className={"block w-full"}>
        {movies.map((movie) => (
          <MovieResultItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

function MovieResultItem({ movie }) {
  const moviePoster = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
  return (
    <li className="flex items-center gap-8 rounded border border-transparent bg-slate-800 p-3 hover:border-white">
      <Link href={`/discover/${movie.id}`} className="flex gap-8 ">
        <div className="w-20">
          <Image
            className="rounded"
            src={moviePoster}
            priority
            width={200}
            height={100}
            unoptimized
            alt={movie.title + " poster" ?? ""}
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-white">{movie.title}</h3>

          <p className=" mb-2 text-sm text-slate-300">
            <span>
              {new Date(movie.release_date).getFullYear()} &#183;{" "}
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m &#183;{" "}
            </span>
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>

          <div className="text-md mb-2 flex items-center gap-2">
            <StarIcon className="w-4 text-yellow-400" />
            <span className="text-white">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

function EmptySearch({ searchQuery = "" }: { searchQuery: string }) {
  return (
    <div className="m-4 flex h-[300px] flex-col items-center justify-center rounded bg-slate-900">
      {searchQuery.trim().length > 0 ? (
        <p className="mb-3 text-xl text-white">No results found</p>
      ) : (
        <p className="mb-3 text-2xl text-white">Enter a movie title</p>
      )}

      <p className="mb-8 text-lg text-slate-300">
        Need a more detailed search?
      </p>

      <Link
        href="/discover"
        className="flex items-center gap-2 text-xl text-slate-300 hover:text-white"
      >
        <span>Discover</span> <ArrowRightIcon className="w-5" />
      </Link>
    </div>
  );
}
