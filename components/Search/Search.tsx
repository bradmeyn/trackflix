import { useEffect, useRef, useState } from 'react';

import './Search.css';
import useOutsideClick from '../../hooks/useOutsideClick';
import SearchDropdown from './SearchDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/pro-regular-svg-icons';
const API_KEY = process.env.REACT_APP_API_KEY;

const params = new URLSearchParams({
  api_key: API_KEY,
  language: 'en-AU',
});

const Search = () => {
  const [active, setActive] = useState(false);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isDesktop, setDesktop] = useState(true);
  const search = useRef(null);
  const searchInput = useRef(null);

  const searchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?${params}&query=${query}&page=1&include_adult=false`
    );

    let { results } = await response.json();
    results = results.splice(0, 5);
    setMovies(results);
  };

  useEffect(() => {
    updateScreen();
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?${params}`
      );
      let { results } = await response.json();
      results = results.splice(0, 5);
      console.log(results);
      setMovies(results);
    };
    fetchData();
  }, []);

  const updateScreen = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreen);
    return () => window.removeEventListener('resize', updateScreen);
  });

  useEffect(() => {
    setQuery('');
    if (query.trim().length > 0) {
      searchMovies(query);
    } else {
      setMovies([]);
    }
  }, [query]);

  useOutsideClick(search, () => {
    if (active) {
      closeSearch();
    }
  });

  const focusInput = () => {
    searchInput.current.focus();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const closeSearch = () => {
    setActive(false);
  };

  const handleFocus = () => {
    searchMovies(query);
  };

  const activateSearch = (e) => {
    e.stopPropagation();
    setActive(true);
  };

  const searchBtn = isDesktop ? (
    <button
      className='flex flex-1 md:max-w-md lg:max-w-xl mx-8 items-center relative bg-slate-700 hover:bg-slate-600 py-3 px-4 rounded-lg '
      onClick={activateSearch}
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} className='text-lg  mr-2' />
      <span className='text-lg md:text-2xl mr-2  '></span>
      <span className='text-md md:text-md'>Search Movies</span>
    </button>
  ) : (
    <FontAwesomeIcon
      icon={faMagnifyingGlass}
      className='ml-auto mr-5 text-lg md:text-2xl hover:text-white cursor-pointer focus:white '
      onClick={activateSearch}
    />
  );

  const render = active ? (
    <div className='fixed p-0 top-0 left-0 h-full w-full z-50 backdrop-blur-md  bg-slate-900/30  '>
      <div ref={search} className='md:max-w-3xl m-10 md:mx-auto '>
        <div
          className='flex items-center flex-1 relative rounded '
          onClick={focusInput}
        >
          <input
            autoFocus
            ref={searchInput}
            placeholder='Search movies'
            className='w-full pl-12 py-3 text-lg md:text-xl text-white bg-slate-700 outline-0 rounded-t-lg'
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='text-lg md:text-xl absolute ml-4'
          />

          <span
            className='text-xl md:text-2xl text-white absolute cursor-pointer z-50 right-4 '
            onClick={closeSearch}
          ></span>
        </div>
        {/* {movies.length > 0 ? ( */}
        <SearchDropdown movies={movies} closeSearch={closeSearch} />
        {/* ) : (
          ''
        )} */}
      </div>
    </div>
  ) : (
    searchBtn
  );

  return <> {render}</>;
};

export default Search;
