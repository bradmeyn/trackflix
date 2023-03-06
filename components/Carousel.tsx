import { IMovie } from '@/types/types';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import Card from './Card';

export default function Carousel({
  title,
  movies,
}: {
  title: string;
  movies: IMovie[];
}) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth * 1,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth * 1,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='p-3'>
      <h2 className='text-md container mx-auto font-bold text-white md:text-2xl'>
        {title}
      </h2>
      <div className='container relative mx-auto'>
        <button
          className={`absolute -left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 rounded-full bg-slate-800 text-slate-400 hover:text-white md:block`}
          onClick={handleScrollLeft}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div
          className='no-scroll-bar container relative mx-auto grid touch-pan-x grid-flow-col gap-2 overflow-hidden overflow-x-scroll p-2 transition-transform duration-500 ease-in-out'
          ref={carouselRef}
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {movies.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
            />
          ))}
        </div>
        <button
          className={`absolute -right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 rounded-full bg-slate-800 text-slate-400 hover:text-white md:block`}
          onClick={handleScrollRight}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
