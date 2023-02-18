import { IMovie } from '@/types/types';
import Card from './Card';

export default function Carousel({
  title,
  movies,
}: {
  title: string;
  movies: IMovie[];
}) {
  return (
    <div className='container mx-auto py-3'>
      <h2 className='md:text-2x mb-2 text-xl font-bold text-white'>{title}</h2>
      <div className='grid grid-flow-col gap-5 overflow-x-scroll  py-2'>
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
