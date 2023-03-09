import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faBookmark,
  faCheck,
  faHeart,
} from '@fortawesome/pro-solid-svg-icons';
import { getMovie } from '@/movieService';
import { IMovie } from '@/types/types';
import { GetServerSideProps, NextPageContext } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Head from 'next/head';

export default function MovieDetail({ movie }: { movie: IMovie }) {
  const moviePoster = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

  if (movie) {
    return (
      <>
        <Head>
          <title>{movie.title}</title>
        </Head>
        <Navbar />
        <div
          className='bg-contain bg-top bg-no-repeat py-10 px-6 text-left md:py-20'
          style={{
            backgroundImage: `linear-gradient(rgba(16, 23, 42, 0.8), rgba(16, 23, 42, 0.8)), url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
          }}
        >
          <div className='container mx-auto flex flex-col justify-start gap-4 md:gap-8 lg:flex-row lg:items-start'>
            <div className='mx-auto'>
              <Image
                className=' h-auto w-[150px]  rounded-md md:w-[200px]  lg:w-[700px]'
                src={moviePoster}
                priority
                width={200}
                height={100}
                unoptimized
                alt={movie.title ?? ''}
              />
            </div>
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
              <p className='mb-4 text-xl italic text-slate-300'>
                {movie.tagline}
              </p>
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
                    <span className='text-white'>
                      {movie.vote_average.toFixed(1)}
                    </span>
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
                    <span className='text-white'>
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
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
