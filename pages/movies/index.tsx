import Head from "next/head";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Inter } from "@next/font/google";
import { getMovies, MovieData } from "@/movieService";
import DiscoverCard from "@/components/discover/DiscoverCard";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import YearsFilter from "@/components/discover/YearsFilter";
import GenresFilter from "@/components/discover/GenresFilter";
import movieGenres from "@/utils/movieGenres";
import UserRatingFilter from "@/components/discover/UserRatingFilter";
import { IMovie } from "@/types/types";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

const inter = Inter({ subsets: ["latin"] });

interface MovieParams {
  releaseYears: {
    min: number;
    max: number;
  };
  genres: number[];
  userRating: number;
  page: string | number;
}

export default function Discover({
  popularMoviesData,
}: {
  popularMoviesData: MovieData;
}) {
  const [movies, setMovies] = useState<IMovie[]>(popularMoviesData.results);
  const [genres, setGenres] = useState(movieGenres);
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
      console.log("updating movies...");
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

        if (appendMovies) {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
          setCurrentPage((prev) => prev + 1);
        } else {
          setCurrentPage(data.page);
          setMovies([...data.results]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    },
    [userRating, releaseYears, currentPage, genres]
  );

  // useInfiniteScroll(gridRef, () => updateMovies(true));

  useEffect(() => {
    updateMovies();
    console.log("useEffect");
  }, [selectedGenres, userRating, releaseYears]);

  return (
    <>
      <Head>
        <title>Watchflix | Discover</title>
      </Head>

      <Navbar />
      <main className={"flex grow flex-col "}>
        <div className="container mx-auto my-10 px-5">
          <div className="mb-3 flex gap-2">
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
            className="relative mb-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7"
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
                className="load-more-btn mx-auto block rounded-md bg-slate-600 p-2 px-5 text-white"
                onClick={() => updateMovies(true)}
              >
                Load More
              </button>
            )
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const popularMoviesData = await getMovies("movie/popular", { page: 1 });
  return {
    props: { popularMoviesData },
  };
}
