import Head from 'next/head';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Inter } from '@next/font/google';
import { getMovies, MovieData } from '@/movieService';
import DiscoverCard from '@/components/discover/DiscoverCard';
import { useEffect, useRef, useState, useCallback } from 'react';
import YearsFilter from '@/components/discover/YearsFilter';
import GenresFilter from '@/components/discover/GenresFilter';
import movieGenres from '@/utils/movieGenres';
import UserRatingFilter from '@/components/discover/UserRatingFilter';
import { IMovie } from '@/types/types';

const inter = Inter({ subsets: ['latin'] });

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

  useEffect(() => {
    updateMovies();
  }, [genres, userRating, releaseYears]);

  // Update movies when user changes filters
  const updateMovies = async () => {
    console.log('updating movies...');
    const selectedGenres = genres
      .filter((genre) => genre.selected)
      .map((genre) => genre.id);

    const params: MovieParams = {
      releaseYears,
      genres: selectedGenres,
      page: currentPage + 1,
      userRating,
    };

    const data = await getMovies('discover/movie', params);

    setCurrentPage(data.page);
    setMovies([...data.results]);
  };

  // Load more movies when user scrolls to bottom of page
  const getMoreMovies = useCallback(async () => {
    if (!isFetching) {
      try {
        setIsFetching(true);
        console.log('getting more movies...');

        const selectedGenres = genres
          .filter((genre) => genre.selected)
          .map((genre) => genre.id);

        const params: MovieParams = {
          releaseYears,
          genres: selectedGenres,
          page: currentPage + 1,
          userRating,
        };

        const movieData = await getMovies('discover/movie', params);

        setMovies((prevMovies) => [...prevMovies, ...movieData.results]);
        setCurrentPage((prev) => prev + 1);
      } catch (e) {
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    }
  }, [genres, userRating, releaseYears, currentPage]);

  // // Infinite scroll
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const firstEntry = entries[0];
  //       if (firstEntry.isIntersecting) {
  //         getMoreMovies();
  //       }
  //     },
  //     { threshold: 1.0 }
  //   );

  //   if (loadMoreRef.current) {
  //     observer.observe(loadMoreRef.current);
  //   }

  //   const currentGridRef = gridRef.current;
  //   return () => {
  //     if (currentGridRef) {
  //       observer.unobserve(currentGridRef);
  //     }
  //   };
  // }, [loadMoreRef, getMoreMovies]);

  return (
    <>
      <Head>
        <title>Watchflix | Discover</title>
      </Head>
      <div className='flex min-h-screen grow flex-col bg-gradient-to-t from-slate-800 to-slate-900 '>
        <Navbar />
        <main className={'flex grow flex-col '}>
          <div className='container mx-auto my-10 px-5'>
            <div className='mb-3 flex gap-2'>
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
              className='relative mb-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'
              ref={gridRef}>
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
                  className='load-more-btn mx-auto block rounded-md bg-slate-600 p-2 px-5 text-white'
                  onClick={getMoreMovies}>
                  Load More
                </button>
              )
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const popularMoviesData = await getMovies('movie/popular', { page: 1 });
  return {
    props: { popularMoviesData },
  };
}
