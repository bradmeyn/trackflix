import Head from 'next/head';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Inter } from '@next/font/google';
import { getMovies, MovieSearchData, getFilteredMovies } from '@/movieService';
import DiscoverCard from '@/components/discover/DiscoverCard';
import { useEffect, useRef, useState } from 'react';
import YearsFilter from '@/components/discover/YearsFilter';
import GenresFilter from '@/components/discover/GenresFilter';
import movieGenres from '@/utils/movieGenres';
import UserRatingFilter from '@/components/discover/UserRatingFilter';

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

  useEffect(() => {
    updateMovies();
  }, [genres, userRating, releaseYears]);

  // const getMoreMovies = async () => {
  //   try {
  //     setMovies([...movies, ...data.results]);
  //     setCurrentPage((prev) => prev + 1);
  //   } catch (e) {}
  // };

  const handleGridEnd = () => {
    const grid = gridRef.current;
    if (grid) {
      const scrollTop = grid.scrollTop;
      const scrollHeight = grid.scrollHeight;
      const clientHeight = grid.clientHeight;

      if (scrollHeight - scrollTop === clientHeight) {
        // User has reached the bottom of the grid
        // getMoreMovies();
        // Here you can add any code that should be executed when the grid hits the end
      }
    }
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

  return (
    <>
      <Head>
        <title>Watchflix | Discover</title>
      </Head>
      <div className='flex min-h-screen grow flex-col bg-gradient-to-t from-slate-800 to-slate-900 '>
        <Navbar />
        <main className={'flex grow flex-col '}>
          <div className='container mx-auto mt-10 px-5'>
            <h1 className='mb-3 text-3xl font-bold text-white'>Discover</h1>
            <div className='mb-3 flex gap-2'>
              <YearsFilter
                releaseYears={releaseYears}
                setReleaseYears={setReleaseYears}
                updateMovies={updateMovies}
              />
              <GenresFilter
                genres={genres}
                setGenres={setGenres}
                updateMovies={updateMovies}
              />
              <UserRatingFilter
                userRating={userRating}
                setUserRating={setUserRating}
                updateMovies={updateMovies}
              />
            </div>
            <div
              className='relative mb-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
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
