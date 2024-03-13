"use client";

import { getMovies } from "@/lib/services/tmdbService";
import DiscoverCard from "@/app/discover/DiscoverCard";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import YearsFilter from "@/app/discover/YearsFilter";
import GenresFilter from "@/app/discover/GenresFilter";
import { MOVIE_GENRES } from "@/lib/constants";
import UserRatingFilter from "@/app/discover/UserRatingFilter";
import { MovieResult } from "@/lib/types/types";

type Props = {
  initialMovies: MovieResult[];
};

type MovieParams = {
  releaseYears: {
    min: number;
    max: number;
  };
  genres: number[];
  userRating: number;
  page: string | number;
};

export default function ClientPage({ initialMovies }: Props) {
  const [movies, setMovies] = useState<MovieResult[]>(initialMovies);
  const [genres, setGenres] = useState(MOVIE_GENRES);
  const [userRating, setUserRating] = useState(0);
  const [releaseYears, setReleaseYears] = useState({ min: 1970, max: 2022 });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLButtonElement>(null);

  const selectedGenres = useMemo(
    () => genres.filter((genre) => genre.selected).map((genre) => genre.id),
    [genres]
  );

  const updateMovies = useCallback(
    async (appendMovies = false) => {
      const selectedGenres = genres
        .filter((genre) => genre.selected)
        .map((genre) => genre.id);

      const params: MovieParams = {
        releaseYears,
        genres: selectedGenres,
        page: currentPage + 1,
        userRating,
      };
      try {
        const data = await getMovies("discover/movie", params);

        if (data) {
          if (appendMovies) {
            setMovies((prevMovies) => [...prevMovies, ...data.results]);
            setCurrentPage((prev) => prev + 1);
          } else {
            setCurrentPage(data.page);
            setMovies([...data.results]);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    },
    [userRating, releaseYears, currentPage, genres]
  );

  useEffect(() => {
    updateMovies();
    console.log("useEffect");
  }, [selectedGenres, userRating, releaseYears]);

  return (
    <>
      <div className="relative mb-3 flex gap-2 text-sm">
        <YearsFilter
          releaseYears={releaseYears}
          setReleaseYears={setReleaseYears}
        />
        <GenresFilter genres={genres} setGenres={setGenres} />
        <UserRatingFilter
          userRating={userRating}
          setUserRating={setUserRating}
        />
      </div>
      <div
        className="relative mb-10 grid grid-cols-4 gap-4 lg:grid-cols-5 xl:grid-cols-7"
        ref={gridRef}
      >
        {movies?.map((movie, i) => (
          <DiscoverCard
            key={i}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
          />
        ))}
      </div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        movies?.length > 0 && (
          <button
            ref={loadMoreRef}
            className="load-more-btn mx-auto block rounded-md bg-sky-600 p-2 px-5 text-white hover:bg-sky-800"
            onClick={() => updateMovies(true)}
          >
            Load More
          </button>
        )
      )}
    </>
  );
}
