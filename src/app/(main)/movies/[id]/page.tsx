import Image from "next/image";
import { auth } from "@/lib/auth";

import { getMovie } from "@/lib/services/tmdbService";
import {
  BookmarkIcon,
  CheckIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const response = await getMovie(params.id);
  const movie = response?.data;

  if (!movie) {
    redirect("/");
  }

  const moviePoster = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

  return (
    <main className="grow">
      <div
        className="bg-cover bg-top bg-no-repeat py-10 px-6 text-left md:py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 23, 42, 0.8), rgba(16, 23, 42, 0.8)), url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        }}
      >
        <div className="container mx-auto flex flex-col justify-start gap-4 md:gap-8 lg:flex-row lg:items-start">
          <div className="mx-auto">
            <Image
              className=" h-auto w-[150px] rounded-md md:w-[200px] lg:w-[700px]"
              src={moviePoster}
              priority
              width={200}
              height={100}
              unoptimized
              alt={movie.title ?? ""}
            />
          </div>
          <div className="content-start justify-self-start">
            <h1 className="mb-2 text-left text-3xl font-bold text-white opacity-100 md:text-5xl">
              {movie.original_title}
            </h1>
            <p className="mb-4 text-lg text-slate-300">
              <span>
                {new Date(movie.release_date).getFullYear()} &#183;{" "}
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m &#183;{" "}
              </span>
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <div className="mb-2 flex gap-2">
              <button className="rounded-full border-2 border-violet-600 p-2 text-lg text-white hover:bg-violet-600 ">
                <BookmarkIcon className="w-5" />
              </button>
              <button className="rounded-full border-2 border-emerald-600 p-2 text-lg text-white hover:bg-emerald-600 ">
                <CheckIcon className="w-5" />
              </button>
            </div>
            <p className="mb-4 italic text-slate-300 md:text-xl">
              {movie.tagline}
            </p>
            <div className="mb-4">
              <h2 className="mb-1 text-xl font-bold text-white">Overview</h2>
              <p className="text-lg text-slate-300 ">{movie.overview}</p>
            </div>
            <div className="mb-6 flex gap-10">
              <div>
                <h2 className="mb-1 text-lg font-bold text-white">Director</h2>
                <p className="text-lg text-slate-300 ">
                  {movie.credits?.crew
                    .filter((crew) => crew.job === "Director")
                    .map((director) => director.name)
                    .join(", ")}
                </p>
              </div>
              <div>
                <h2 className="mb-1 text-lg font-bold text-white">Cast</h2>
                <p className="text-lg text-slate-300 ">
                  {movie.credits?.cast
                    .splice(0, 4)
                    .map((cast) => cast.name)
                    .join(", ")}
                </p>
              </div>
            </div>
            <h6 className="mb-1 text-lg font-bold text-white">
              Average Rating
            </h6>
            <div className="flex items-center gap-2 ">
              <StarIcon className="w-4 text-yellow-400" />
              <span className="text-white">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

async function WatchlistButton({ movieId }: { movieId: string }) {
  const session = await auth();
  console.log(session?.user);

  if (session?.user) {
    console.log(session.user.watchlistId);
  }

  // check if movie is in watchlist

  return (
    <button className="rounded-full border-2 border-violet-600 p-2 text-lg text-white hover:bg-violet-600 ">
      <BookmarkIcon className="w-5" />
    </button>
  );
}
