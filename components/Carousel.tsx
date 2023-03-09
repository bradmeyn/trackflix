import { IMovie } from '@/types/types';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import Card from './Card';
import { CarouselData } from '@/pages/movies';
import { getMovies } from '@/movieService';

export default function Carousel({
  carouselData,
}: {
  carouselData: CarouselData;
}) {
  const { title, url, data } = carouselData;

  const [movies, setMovies] = useState(data.results);
  const [currentPage, setCurrentPage] = useState(1);
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

  const getMoreMovies = async () => {
    try {
      const data = await getMovies(url, currentPage + 1);

      setMovies([...movies, ...data.results]);
      setCurrentPage((prev) => prev + 1);
    } catch (e) {}
  };

  const handleCarouselEnd = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollRight =
        carousel.scrollWidth - carousel.clientWidth - carousel.scrollLeft;
      if (scrollRight === 0) {
        getMoreMovies();
        // Here you can add any code that should be executed when the carousel hits the end
      }
    }
  };

  return (
    <div className='p-3'>
      <h2 className='container mx-auto text-lg font-bold text-white md:text-2xl'>
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
          className='no-scroll-bar container relative mx-auto grid touch-pan-x grid-flow-col gap-4 overflow-hidden overflow-y-auto overflow-x-scroll p-2 py-4 transition-transform duration-500 ease-in-out md:gap-6'
          ref={carouselRef}
          onScroll={handleCarouselEnd}
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
