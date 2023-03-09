import Head from 'next/head';

import { IMovie } from '@/types/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Inter } from '@next/font/google';
import { getMovies, MovieSearchData, discoverMovies } from '@/movieService';
import DiscoverCard from '@/components/DiscoverCard';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Discover({
  popularMoviesData,
}: {
  popularMoviesData: MovieSearchData;
}) {
  const [movies, setMovies] = useState(popularMoviesData?.results);
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
            <div></div>
            <div className='grid grid-cols-2 gap-4  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
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
