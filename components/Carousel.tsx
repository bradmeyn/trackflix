import { IMovie } from '@/types/types';
import Card from './Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/pro-regular-svg-icons';

export default function Carousel({
  title,
  movies,
}: {
  title: string;
  movies: IMovie[];
}) {
  return (
    <div className='p-3 '>
      <h2 className='text-md container mx-auto   font-bold text-white md:text-2xl'>
        {title}
      </h2>
      <div className='no-scroll-bar container mx-auto grid w-screen grid-flow-col gap-2 overflow-visible overflow-x-scroll py-2  md:gap-5'>
        {movies
          ? movies.map((movie: IMovie) => (
              <Card
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
              />
            ))
          : ''}
      </div>
    </div>
  );
}
