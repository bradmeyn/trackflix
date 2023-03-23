import Head from 'next/head';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Inter } from '@next/font/google';
import {
  getMovies,
  MovieSearchData,
  getFilteredMovies,
  MovieParams,
} from '@/movieService';
import DiscoverCard from '@/components/discover/DiscoverCard';
import { useEffect, useRef, useState } from 'react';
import YearsFilter from '@/components/discover/YearsFilter';
import GenresFilter from '@/components/discover/GenresFilter';
import movieGenres from '@/utils/movieGenres';
import UserRatingFilter from '@/components/discover/UserRatingFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus } from '@fortawesome/pro-solid-svg-icons';

const inter = Inter({ subsets: ['latin'] });

export default function Discover({
  popularMoviesData,
}: {
  popularMoviesData: MovieSearchData;
}) {
  const [movies, setMovies] = useState(popularMoviesData?.results);
  const [genres, setGenres] = useState(movieGenres);
  const [userRating, setUserRating] = useState(0);
  const [releaseYears, setReleaseYears] = useState({ min: 1970, max: 2022 });
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    updateMovies();
  }, [genres, userRating, releaseYears]);
  const [isFetching, setIsFetching] = useState(false);

  const getMoreMovies = async () => {
    try {
      const selectedGenres = genres
        .filter((genre) => genre.selected)
        .map((genre) => genre.id);
      const params: MovieParams = {
        releaseYears,
        genres: selectedGenres,
        page: currentPage + 1,
        userRating,
      };

      const movieData = await getFilteredMovies(params);
      setMovies([...movies, ...movieData.results]);
      setCurrentPage((prev) => prev + 1);
    } catch (e) {}
  };

  const updateMovies = async () => {
    const selectedGenres = genres
      .filter((genre) => genre.selected)
      .map((genre) => genre.id);
    const data = await getFilteredMovies({
      releaseYears,
      genres: selectedGenres,
      page: currentPage,
      userRating,
    });

    setCurrentPage(data.page);
    setMovies([...data.results]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          getMoreMovies();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, getMoreMovies]);

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
              ref={gridRef}
            >
              {movies.map((movie) => (
                <DiscoverCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster={movie.poster_path}
                />
              ))}
            </div>
            <button
              ref={loadMoreRef}
              className='load-more-btn mx-auto block rounded-md bg-slate-600 p-2 text-white'
              onClick={getMoreMovies}
            >
              <span className='mr-2'>Load more</span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const popularMoviesData = await getMovies('trending/movie/week?', 1);
  return {
    props: { popularMoviesData },
  };
}
