import Card from './Card';

export default function Carousel({ title, movies }) {
  return (
    <div className='m-5'>
      <h2 className='md:text-2x mb-2 text-xl font-bold text-white'>{title}</h2>
      <div className='grid grid-flow-col gap-5 overflow-x-scroll  '>
        {movies
          ? movies.map((movie) => (
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
