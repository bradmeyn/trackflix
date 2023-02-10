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

export default function MovieDetail({ movie }: { movie: IMovie }) {
  if (movie) {
    return (
      <>
        <div
          className='mb-10 bg-cover bg-top bg-no-repeat py-10 px-6 text-left md:py-20'
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
          }}
        >
          <div className='hero-content flex-col justify-start lg:flex-row'>
            <img
              className='mb-2 w-48 rounded-lg shadow-2xl md:mr-4 md:w-60 lg:w-80'
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt='movie poster'
            />
            <div className='content-start justify-self-start'>
              <h1 className='mb-2 text-left text-3xl font-bold text-white opacity-100 md:text-5xl'>
                {movie.original_title}
              </h1>
              <p className='mb-4 text-lg text-slate-300'>
                <span>
                  {new Date(movie.release_date).getFullYear()} &#183;{' '}
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m &#183;{' '}
                </span>
                {movie.genres.map((genre) => genre.name).join(', ')}
              </p>
              <div className='mb-2  flex '>
                <button className='mr-6 h-12 w-12 rounded-full border-2 border-sky-600 text-lg text-white hover:bg-sky-600 '>
                  <FontAwesomeIcon icon={faBookmark} />
                </button>
                <button className='mr-6 h-12 w-12 rounded-full border-2 border-emerald-600 text-lg text-white hover:bg-emerald-600 '>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button className='mr-6 h-12 w-12 rounded-full border-2 border-purple-600 text-lg text-white hover:bg-purple-600 '>
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
              <p className='mb-4 text-xl italic'>{movie.tagline}</p>
              <div className='mb-4'>
                <h2 className='mb-1 text-xl font-bold text-white'>Overview</h2>
                <p className='text-md font-light text-white'>
                  {movie.overview}
                </p>
              </div>
              <div className='mb-6 flex'>
                <div className='mr-20'>
                  <h2 className='mb-1 text-lg font-bold text-white'>
                    Director
                  </h2>
                  <p className='text-md font-light text-white'>
                    {movie.credits?.crew
                      .filter((crew) => crew.job === 'Director')
                      .map((director) => director.name)
                      .join(', ')}
                  </p>
                </div>
                <div>
                  <h2 className='mb-1 text-lg font-bold text-white'>Cast</h2>
                  <p className='text-md font-light text-white'>
                    {movie.credits?.cast
                      .splice(0, 4)
                      .map((cast) => cast.name)
                      .join(', ')}
                  </p>
                </div>
              </div>
              <div className='flex '>
                <div className='mr-8'>
                  <h6 className='mb-1 text-lg font-bold text-white'>
                    Average Rating
                  </h6>
                  <div className='flex items-center '>
                    <FontAwesomeIcon
                      icon={faStar}
                      className='mr-2 text-yellow-400'
                    />
                    {/* <span className='text-white'>
                      {Math.round(movie.vote_average * 10) / 10}
                    </span> */}
                  </div>
                </div>

                <div className=''>
                  <h6 className='mb-1 text-lg font-bold text-white'>
                    Your Rating
                  </h6>
                  <div className='flex items-center '>
                    <FontAwesomeIcon
                      icon={faStar}
                      className='mr-2 text-sky-400'
                    />
                    {/* <span className='text-white'>
                      {Math.round(movie.vote_average * 10) / 10}
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
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
