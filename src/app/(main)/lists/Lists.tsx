"use client";

import Image from "next/image";
import { Tab } from "@headlessui/react";
import {
  ArrowRightIcon,
  StarIcon,
  HeartIcon,
  CheckIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import RemoveMovieButton from "./RemoveMovieButton";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function tabColor(list) {
  switch (list.name) {
    case "Favourites":
      return "bg-yellow-500";
    case "Seen":
      return "bg-green-600";
    default:
      return "bg-violet-800";
  }
}

function tabIcon(list) {
  switch (list.name) {
    case "Favourites":
      return <HeartIcon className="w-5" />;
    case "Seen":
      return <CheckIcon className="w-5" />;
    default:
      return <BookmarkIcon className="w-5" />;
  }
}

export default function Lists({ lists }) {
  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex gap-3 space-x-2 rounded">
          {lists.map((list) => (
            <Tab
              key={list.name}
              className={({ selected }) =>
                classNames(
                  "mb-10 flex w-full items-center justify-center gap-2 rounded py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-slate-400 focus:outline-none focus:ring-2",
                  selected
                    ? list.name === "Favourites"
                      ? "bg-pink-700 text-white shadow"
                      : list.name === "Seen"
                      ? "bg-green-700 text-white shadow"
                      : "bg-sky-700 text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {tabIcon(list) ?? ""} <span>{list.name}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {lists.map((list, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded  ",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              {list.movies.length > 0 ? (
                <ul>
                  {list.movies.map((movie) => (
                    <MovieItem key={movie.id} movie={movie} list={list} />
                  ))}
                </ul>
              ) : (
                <EmptyList listName={list.name} />
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

function MovieItem({ movie, list }) {
  const moviePoster = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

  return (
    <li className="flex items-center gap-8 rounded border border-transparent bg-slate-800 p-3 hover:border-white">
      <Link href={`/discover/${movie.id}`} className="flex gap-8 ">
        <div className="w-20">
          <Image
            className="rounded"
            src={moviePoster}
            priority
            width={200}
            height={100}
            unoptimized
            alt={movie.title + " poster" ?? ""}
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-white">{movie.title}</h3>

          <p className=" mb-2 text-sm text-slate-300">
            <span>
              {new Date(movie.release_date).getFullYear()} &#183;{" "}
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m &#183;{" "}
            </span>
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>

          <div className="text-md mb-2 flex items-center gap-2">
            <StarIcon className="w-4 text-yellow-400" />
            <span className="text-white">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </Link>
      <RemoveMovieButton listId={list.id} movieId={movie.id} />
    </li>
  );
}

function EmptyList({ listName }) {
  return (
    <div className=" flex flex-col items-center justify-center gap-2 p-3">
      <h2 className="text-2xl font-semibold text-white">
        No movies in {listName}
      </h2>
      <p className="mb-4 text-sm text-slate-200">
        Add a movie to your list by clicking the{" "}
        <span className="font-semibold">Add</span> button on any movie page.
      </p>
      <Link
        href="/discover"
        className="flex items-center gap-2 text-slate-200 hover:text-white hover:underline"
      >
        <span>Discover movies</span> <ArrowRightIcon className="w-4" />
      </Link>
    </div>
  );
}
