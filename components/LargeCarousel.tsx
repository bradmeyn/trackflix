import { IMovie } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/pro-regular-svg-icons';

export default function LargeCarousel({ movies }: { movies: IMovie[] }) {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  let featuredMovie = movies[featuredIndex];

  const moveLeft = (e: MouseEvent) => {
    e.preventDefault();
    setFeaturedIndex((prev) => prev + -1);
  };

  const moveRight = (e: MouseEvent) => {
    e.preventDefault();
    setFeaturedIndex((prev) => prev + 1);
  };

  return (
    <>
      <div className='custom-shadow container mx-auto flex h-[200px] w-full overflow-hidden rounded hover:outline-slate-400  hover:outline md:mx-auto md:h-[300px] lg:h-[350px]'>
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className={`min-w-full rounded bg-cover bg-no-repeat text-left transition-transform duration-500 ease-in-out hover:cursor-pointer`}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              transform: `translateX(-${featuredIndex * 100}%)`,
            }}
          >
            <div className='flex h-full items-center justify-between'>
              {featuredIndex !== 0 ? (
                <button
                  className='p-5 text-slate-400 hover:text-white'
                  onClick={moveLeft}
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className='text-lg md:text-4xl'
                  />
                </button>
              ) : (
                <div className='p-5'>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className='text-lg text-transparent md:text-4xl'
                  />
                </div>
              )}

              <div className='flex w-full items-center justify-start md:flex-row'>
                <Image
                  className='w-[100px] rounded md:w-[150px] lg:w-[200px]'
                  loader={() =>
                    `https://image.tmdb.org/t/p/w400${movie.poster_path}`
                  }
                  src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                  width={200}
                  height={100}
                  alt={movie.title ?? ''}
                />
                <div className='pl-10'>
                  <h1 className='text-3xl font-bold md:text-5xl lg:text-6xl '>
                    {movie.title}
                  </h1>
                  {/* <p className='truncate-300 md:text-md xl:2xl w-[600px] font-light'>
                    {movie.overview}
                  </p> */}
                </div>
              </div>
              <ul className='absolute bottom-3  left-1/2 hidden -translate-x-1/2 transform md:flex'>
                {movies.map((movie, i) => (
                  <li key={movie.id}>
                    <button
                      disabled={featuredIndex === i}
                      onClick={(e) => {
                        e.preventDefault();
                        setFeaturedIndex(i);
                      }}
                      className={`mx-2 rounded-full border border-slate-200 p-1 hover:bg-slate-100 ${
                        featuredIndex === i ? 'bg-slate-100' : ''
                      }`}
                    ></button>
                  </li>
                ))}
              </ul>
              <button
                onClick={moveRight}
                className='p-5 text-slate-400 hover:text-white'
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className='text-lg md:text-4xl'
                />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
