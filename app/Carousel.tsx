"use client";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Card from "./Card";
import { getMovies } from "@/movieService";
import type { CarouselData } from "@/app/page";

type Props = {
  carouselData: CarouselData;
};

export default function Carousel({ carouselData }: Props) {
  const { title, url, data, year } = carouselData;

  const [movies, setMovies] = useState(data?.results ?? []);
  const [currentPage, setCurrentPage] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth * 1,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth * 1,
        behavior: "smooth",
      });
    }
  };

  const getMoreMovies = async () => {
    try {
      const data = await getMovies(url, { page: currentPage + 1, year });
      setMovies([...movies, ...(data?.results ?? [])]);
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
      }
    }
  };

  return (
    <div className="container mx-auto mb-2">
      <h2 className="px-2 text-lg font-bold text-white md:text-xl">{title}</h2>
      <div className="relative">
        <button
          className={`absolute -left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 rounded-full bg-slate-800 text-slate-400 hover:text-white md:block`}
          onClick={handleScrollLeft}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div
          className="no-scroll-bar container relative mx-auto grid touch-pan-x grid-flow-col gap-4 overflow-hidden overflow-y-auto overflow-x-scroll p-2 transition-transform duration-500 ease-in-out md:gap-6"
          ref={carouselRef}
          onScroll={handleCarouselEnd}
          style={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
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
