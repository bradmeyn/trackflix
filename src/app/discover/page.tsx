import { getMovies, MovieData } from "@/lib/services/tmdbService";
import ClientPage from "./ClientPage";

export default async function DiscoverPage() {
  const popularMoviesData = await getMovies("movie/popular", { page: 1 });

  return (
    <main className="container mx-auto my-10 grow px-5">
      <ClientPage initialMovies={popularMoviesData?.results ?? []} />
    </main>
  );
}
