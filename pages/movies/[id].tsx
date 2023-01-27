import { Context, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faBookmark,
  faCheck,
  faHeart,
} from '@fortawesome/pro-solid-svg-icons';
import { faBookmark as falStar } from '@fortawesome/pro-regular-svg-icons';
import { getMovie } from '@/movieService';
import { IMovie } from '@/types/types';
import { GetServerSideProps, NextPageContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { type } from 'os';

export default function MovieDetail({ movie }: { movie: IMovie }) {
  console.log(movie);
  return (
    movie && (
      <div>
        <div
          className='text-left py-10 md:py-20 px-6 bg-cover bg-no-repeat bg-top mb-10'
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
          }}
        >
          <div className='hero-content justify-start flex-col lg:flex-row  '>
            <img
              className='rounded-lg shadow-2xl md:mr-4 w-48 md:w-60 lg:w-80 mb-2'
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt='movie poster'
            />
            <div className='justify-self-start content-start'>
              <h1 className='mb-2 text-3xl md:text-5xl font-bold text-white text-left opacity-100'>
                {movie.original_title}
              </h1>
              <p className='text-lg mb-4 text-slate-300'>
                <span>
                  {new Date(movie.release_date).getFullYear()} &#183;{' '}
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m &#183;{' '}
                </span>
                {movie.genres.map((genre) => genre.name).join(', ')}
              </p>
              <div className='flex  mb-2 '>
                <button className='text-lg mr-6 rounded-full hover:bg-sky-600 border-sky-600 border-2 text-white w-12 h-12 '>
                  <FontAwesomeIcon icon={faBookmark} />
                </button>
                <button className='text-lg mr-6 rounded-full hover:bg-emerald-600 border-emerald-600 border-2 text-white w-12 h-12 '>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button className='text-lg mr-6 rounded-full hover:bg-purple-600 border-purple-600 border-2 text-white w-12 h-12 '>
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
              <p className='text-xl mb-4 italic'>{movie.tagline}</p>
              <div className='mb-4'>
                <h2 className='text-white text-xl font-bold mb-1'>Overview</h2>
                <p className='text-md font-light text-white'>
                  {movie.overview}
                </p>
              </div>
              <div className='flex mb-6'>
                <div className='mr-20'>
                  <h2 className='text-white text-lg font-bold mb-1'>
                    Director
                  </h2>
                  <p className='text-md font-light text-white'>
                    {movie.credits.crew
                      .filter((crew) => crew.job === 'Director')
                      .map((director) => director.name)
                      .join(', ')}
                  </p>
                </div>
                <div>
                  <h2 className='text-white text-lg font-bold mb-1'>Cast</h2>
                  <p className='text-md font-light text-white'>
                    {movie.credits.cast
                      .splice(0, 4)
                      .map((cast) => cast.name)
                      .join(', ')}
                  </p>
                </div>
              </div>
              <div className='flex '>
                <div className='mr-8'>
                  <h6 className='text-white text-lg font-bold mb-1'>
                    Average Rating
                  </h6>
                  <div className='flex items-center '>
                    <FontAwesomeIcon
                      icon={faStar}
                      className='mr-2 text-yellow-400'
                    />
                    <span className='text-white'>
                      {Math.round(movie.vote_average * 10) / 10}
                    </span>
                  </div>
                </div>

                <div className=''>
                  <h6 className='text-white text-lg font-bold mb-1'>
                    Your Rating
                  </h6>
                  <div className='flex items-center '>
                    <FontAwesomeIcon
                      icon={faStar}
                      className='mr-2 text-sky-400'
                    />
                    <span className='text-white'>
                      {Math.round(movie.vote_average * 10) / 10}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

type MovieStaticProps = {
  movie: IMovie;
};

type MovieId = { id: string };

export const getServerSideProps: GetServerSideProps<
  MovieStaticProps,
  MovieId
> = async (context) => {
  const id = context.params!.id;

  const response = await getMovie(id);

  const movie = response.data;

  return {
    props: {
      movie,
    },
  };
};
