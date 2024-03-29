"use client";
import { MovieResult } from "@/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

type Props = {
  movies: MovieResult[];
};

export default function Banner({ movies }: Props) {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const moveLeft = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setFeaturedIndex((prev) => prev + -1);
  };

  const moveRight = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setFeaturedIndex((prev) => {
      if (prev === movies.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (featuredIndex !== movies.length - 1) {
        moveRight();
      } else {
        setFeaturedIndex(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredIndex, movies.length]);

  return (
    <>
      <div className="px-3 py-2 text-white">
        <div className="custom-shadow hover:outline-3 container mx-auto mb-3 flex h-[200px] w-full overflow-clip rounded hover:outline md:mx-auto md:h-[300px] lg:h-[370px]">
          {movies.map((movie, i) => (
            <Link
              key={movie.id}
              href={`/discover/${movie.id}`}
              className={`min-w-full rounded bg-cover bg-no-repeat text-left transition-transform duration-500 ease-in-out hover:cursor-pointer`}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                transform: `translateX(-${featuredIndex * 100}%)`,
              }}
            >
              <div className="flex h-full items-center justify-between">
                {featuredIndex !== 0 ? (
                  <button
                    className="z-10 h-full  p-3 text-slate-400 hover:text-white md:p-5"
                    onClick={moveLeft}
                  >
                    <ChevronLeftIcon className="w-10 text-lg md:text-4xl" />
                  </button>
                ) : (
                  <div className="p-3 md:p-5">
                    <ChevronLeftIcon className="h-full w-10 text-lg text-transparent md:text-4xl" />
                  </div>
                )}

                <div className="flex w-full ">
                  <Image
                    className=" w-[100px] rounded  md:w-[150px]  lg:w-[200px] xl:ml-6"
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    loader={({ src }) => src}
                    priority
                    width={200}
                    height={100}
                    alt={movie.title ?? ""}
                  />

                  <div
                    className={`transition-[opacity,transform] duration-1000 ease-in-out xl:ml-5 ${
                      featuredIndex === i
                        ? "translate-x-8 opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <h1
                      className={`mb-4 max-w-sm pt-1 text-3xl font-bold text-white sm:text-3xl md:pt-4 md:text-4xl lg:max-w-xl lg:text-6xl  xl:max-w-2xl`}
                    >
                      {movie.title}
                    </h1>

                    <div className="text-md flex items-center md:text-2xl ">
                      <StarIcon className="mr-2 w-5 text-yellow-400" />
                      <span className="text-slate-100">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <ul className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 transform md:flex">
                  {movies.map((movie, i) => (
                    <li key={movie.id}>
                      <button
                        disabled={featuredIndex === i}
                        onClick={(e) => {
                          e.preventDefault();
                          setFeaturedIndex(i);
                        }}
                        className={`mx-2 rounded-full  p-[5px] hover:bg-slate-100 ${
                          featuredIndex === i ? "bg-slate-100" : "bg-slate-500"
                        }`}
                      ></button>
                    </li>
                  ))}
                </ul>
                {featuredIndex !== movies.length - 1 ? (
                  <button
                    onClick={moveRight}
                    className="z-10 h-full p-3 text-slate-400 hover:text-white md:p-5"
                  >
                    <ChevronRightIcon className="w-10 text-lg md:text-4xl" />
                  </button>
                ) : (
                  <div className="p-3 md:p-5">
                    <ChevronRightIcon className="h-full w-10 text-lg text-transparent md:text-4xl" />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
