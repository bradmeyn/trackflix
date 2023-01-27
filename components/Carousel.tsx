import Card from './Card';

export default function Carousel({ title, movies }) {
  return (
    <div className='py-5'>
      <h2 className='mb-2 font-bold text-white text-xl md:text-2x'>{title}</h2>
      <div className='grid gap-5 grid-flow-col overflow-x-scroll  '>
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
