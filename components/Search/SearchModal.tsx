"use client";

import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { MovieResult } from "@/types/types";
import { searchMovies } from "@/movieService";
import useOutsideClick from "../../hooks/useOutsideClick";
import SearchDropdown from "./SearchDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";

export default function SearchModal() {
  const [modalActive, setModalActive] = useState(false);
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDesktop, setDesktop] = useState<Boolean>(false);
  const searchContainer = useRef(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const updateScreen = () => setDesktop(window.innerWidth > 650);

  useEffect(() => {
    updateScreen();
  }, []);

  const getMovies = useCallback(async () => {
    if (searchQuery.trim().length > 0) {
      const data = await searchMovies(searchQuery);
      setMovies(data);
    } else {
      setMovies([]);
    }
  }, [searchQuery]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value.trim());
  };

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      getMovies();
    } else {
      setMovies([]);
    }
  }, [searchQuery, getMovies]);

  useEffect(() => {
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  });

  useOutsideClick(searchContainer, () => {
    if (modalActive) {
      closeSearch();
    }
  });

  const focusInput = () => {
    searchInput.current?.focus();
  };

  const closeSearch = () => {
    setModalActive(false);
  };

  const activateSearch = (e: MouseEvent) => {
    e.stopPropagation();
    setModalActive(true);
  };

  return (
    <>
      {modalActive ? (
        <div className="fixed top-0 left-0 z-50 h-full w-full bg-slate-900/30 p-0  backdrop-blur-md  ">
          <div ref={searchContainer} className="m-10 md:mx-auto md:max-w-3xl ">
            <div
              className="relative flex flex-1 items-center rounded "
              onClick={focusInput}
            >
              <input
                autoFocus
                ref={searchInput}
                placeholder="Search movies"
                className={`w-full bg-slate-700 py-3 pl-12 text-lg text-white outline-0 md:text-xl ${
                  movies.length > 0 ? "rounded-t" : "rounded"
                }`}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute ml-4 text-lg md:text-xl"
              />
              <span
                className="absolute right-4 z-50 cursor-pointer text-xl text-white"
                onClick={closeSearch}
              ></span>
            </div>
            {movies?.length > 0 ? (
              <SearchDropdown movies={movies} closeSearch={closeSearch} />
            ) : movies.length === 0 && searchQuery.trim() !== "" ? (
              <div className="rounded-b bg-slate-800 p-3">
                <p className=" text-slate-300">No results found</p>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          {isDesktop ? (
            <button
              className="text-md relative mx-8 flex flex-1 items-center rounded-md bg-slate-700 py-2 px-4 text-slate-300 hover:bg-slate-600 hover:text-white md:max-w-md lg:max-w-xl"
              onClick={activateSearch}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-3" />
              <span>Search movies</span>
            </button>
          ) : (
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="focus:white ml-auto mr-5 cursor-pointer text-xl hover:text-white "
              onClick={activateSearch}
            />
          )}
        </>
      )}
    </>
  );
}
