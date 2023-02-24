import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { IMovie } from '@/types/types';
import { searchMovies } from '@/movieService';
import useOutsideClick from '../../hooks/useOutsideClick';
import SearchDropdown from './SearchDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/pro-regular-svg-icons';

export default function SearchModal() {
  const [modalActive, setModalActive] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDesktop, setDesktop] = useState(true);
  const searchContainer = useRef(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const updateScreen = () => setDesktop(window.innerWidth > 650);

  const getMovies = async () => {
    const data = await searchMovies(searchQuery);
    setMovies(data);
  };

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      getMovies();
    } else {
      setMovies([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    window.addEventListener('resize', updateScreen);
    return () => window.removeEventListener('resize', updateScreen);
  });

  useOutsideClick(searchContainer, () => {
    if (modalActive) {
      closeSearch();
    }
  });

  const focusInput = () => {
    searchInput.current?.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const closeSearch = () => {
    setModalActive(false);
  };

  const activateSearch = (e: MouseEvent) => {
    e.stopPropagation();
    setModalActive(true);
  };

  const searchBtn = isDesktop ? (
    <button
      className='relative mx-8 flex flex-1 items-center rounded-lg bg-slate-700 py-3 px-4 hover:bg-slate-600 md:max-w-md lg:max-w-xl '
      onClick={activateSearch}
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} className='mr-2  text-lg' />
      <span className='mr-2 text-lg md:text-2xl  '></span>
      <span className='text-md md:text-md'>Search Movies</span>
    </button>
  ) : (
    <FontAwesomeIcon
      icon={faMagnifyingGlass}
      className='focus:white ml-auto mr-5 cursor-pointer text-lg hover:text-white md:text-2xl '
      onClick={activateSearch}
    />
  );

  return (
    <>
      {modalActive ? (
        <div className='fixed top-0 left-0 z-50 h-full w-full bg-slate-900/30 p-0  backdrop-blur-md  '>
          <div ref={searchContainer} className='m-10 md:mx-auto md:max-w-3xl '>
            <div
              className='relative flex flex-1 items-center rounded '
              onClick={focusInput}
            >
              <input
                autoFocus
                ref={searchInput}
                placeholder='Search movies'
                className='w-full rounded-t-lg bg-slate-700 py-3 pl-12 text-lg text-white outline-0 md:text-xl'
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className='absolute ml-4 text-lg md:text-xl'
              />
              <span
                className='absolute right-4 z-50 cursor-pointer text-xl text-white md:text-2xl '
                onClick={closeSearch}
              ></span>
            </div>
            {movies.length > 0 ? (
              <SearchDropdown movies={movies} closeSearch={closeSearch} />
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        <>{searchBtn}</>
      )}
    </>
  );
}
