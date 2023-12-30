import Image from "next/image";

import { getMovie } from "@/lib/services/tmdbService";
import { StarIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";

import WatchlistButton from "./WatchlistButton";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const response = await getMovie(+params.id);
  const movie = response?.data;
  console.log(movie);

  if (!movie) {
    redirect("/");
  }

  const moviePoster = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

  const cast = movie.credits?.cast
    .splice(0, 4)
    .map((cast) => cast.name)
    .join(", ");

  const director = movie.credits?.crew
    .filter((crew) => crew.job === "Director")
    .map((director) => director.name)
    .join(", ");

  return (
    <main className="grow">
      <div className="">
        <div
          className="bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 23, 42, 0.8), rgba(16, 23, 42, 0.8)), url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
          }}
        >
          <div className="container mx-auto flex flex-col gap-4   p-4 md:max-w-[1000px]">
            <div className="flex gap-4 md:gap-8">
              <div className="w-32 md:w-72 md:min-w-[250px] lg:w-80 lg:min-w-[300px]">
                <Image
                  className="w-full rounded"
                  src={moviePoster}
                  priority
                  width={200}
                  height={100}
                  unoptimized
                  alt={movie.title + " poster" ?? ""}
                />
              </div>

              <div>
                <h1 className="mb-2 text-xl font-bold text-white md:text-3xl">
                  {movie.original_title}
                </h1>
                <p className=" mb-2 text-sm text-slate-300">
                  <span>
                    {new Date(movie.release_date).getFullYear()} &#183;{" "}
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                    &#183;{" "}
                  </span>
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
                <div className="text-md mb-2 flex items-center gap-2">
                  <StarIcon className="w-6 text-yellow-400" />
                  <span className="text-white">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <p className="text-md mb-3 italic text-slate-300 md:text-lg">
                  {movie.tagline}
                </p>
                {/* @ts-expect-error Server Component */}
                <WatchlistButton movieId={movie.id} />

                <div className="hidden w-full md:block">
                  <TextBlock title="Overview" paragraph={movie.overview} />
                  <TextBlock title="Director" paragraph={director} />
                  <TextBlock title="Cast" paragraph={cast} />
                </div>
              </div>
            </div>
            {/*  */}

            <div className="w-full md:hidden">
              <TextBlock title="Overview" paragraph={movie.overview} />
              <div className="flex flex-wrap">
                <TextBlock title="Director" paragraph={director} />
                <TextBlock title="Cast" paragraph={cast} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function TextBlock({ title, paragraph }) {
  return (
    <div className="mb-4">
      <h2 className="text-md mb-1 font-bold text-white md:text-lg">{title}</h2>
      <p className="text-sm text-slate-300">{paragraph}</p>
    </div>
  );
}
