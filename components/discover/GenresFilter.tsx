import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  useRef,
  useState,
} from 'react';

import useOutsideClick from '@/hooks/useOutsideClick';

interface MovieGenreFilter {
  id: number;
  name: string;
  selected: boolean;
}

export default function GenresFilter({
  genres,
  setGenres,
  updateMovies,
}: {
  genres: MovieGenreFilter[];
  setGenres: (newGenres: MovieGenreFilter[]) => void;
  updateMovies: () => void;
}) {
  const [isActive, setIsActive] = useState(false);
  const filterContainer = useRef<HTMLDivElement>(null);

  useOutsideClick(filterContainer, () => {
    if (isActive) {
      setIsActive(false);
    }
  });

  const toggleIsActive = () => setIsActive((prev) => !prev);

  const handleGenreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedGenres = genres.map((genre) => {
      if (Number(e.target.value) === genre.id) {
        return { ...genre, selected: e.target.checked };
      } else {
        return genre;
      }
    });

    setGenres(updatedGenres);

    updateMovies();
  };
  const handleReset = () => {
    const resetGenres: MovieGenreFilter[] = genres.map((genre) => {
      return { ...genre, selected: false };
    });
    setGenres(resetGenres);
  };

  return (
    <span ref={filterContainer}>
      <button
        onClick={toggleIsActive}
        className={`rounded-md p-2  ${
          isActive
            ? 'bg-slate-600 text-white'
            : 'text-slate-300 hover:bg-slate-600 hover:text-white'
        }`}
      >
        <span className='mr-2'>Genres</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {isActive ? (
        <div
          className={
            'absolute z-10 mt-1 w-96 rounded bg-slate-700 p-5 shadow-lg'
          }
        >
          <div className='mb-3 flex justify-between'>
            <h4 className='text-xl text-white'>Genres</h4>
            <button onClick={handleReset}>Reset</button>
          </div>
          <div className='grid grid-cols-2'>
            {genres.map((genre) => (
              <label key={genre.id} className='flex items-center'>
                <input
                  type='checkbox'
                  value={genre.id}
                  checked={genre.selected}
                  onChange={handleGenreChange}
                />
                <span className='ml-2'>{genre.name}</span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </span>
  );
}
