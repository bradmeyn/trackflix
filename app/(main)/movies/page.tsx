import { getMovies, MovieData } from "@/movieService";
import ClientPage from "./ClientPage";

export default async function DiscoverPage() {
  const popularMoviesData = await getMovies("movie/popular", { page: 1 });

  return (
    <main className="container mx-auto my-10 px-5">
      <ClientPage initialMovies={popularMoviesData?.results ?? []} />
    </main>
  );
}
