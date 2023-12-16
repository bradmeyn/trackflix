import type { MovieData } from "@services/tmdbService";
import { getMovies } from "@services/tmdbService";
import Banner from "./Banner";
import Carousel from "./Carousel";

export type CarouselData = {
  title: string;
  url: string;
  data?: MovieData;
  year?: number;
};

export async function getData() {
  const popularMoviesData = await getMovies("trending/movie/week", { page: 1 });
  const topRatedMoviesData = await getMovies("movie/top_rated", { page: 1 });
  const randomYear = Math.floor(Math.random() * 40) + 1970;
  const years = [
    randomYear - 10,
    randomYear - 5,
    randomYear,
    randomYear + 5,
    randomYear + 10,
  ];
  const randomYearMovies = await Promise.all(
    years.map((year) =>
      getMovies("discover/movie", { primary_release_year: year })
    )
  );
  const carouselData: CarouselData[] = [
    {
      title: "Popular Now",
      url: "trending/movie/week",
      data: popularMoviesData,
    },
    {
      title: "All Time Classics",
      url: "movie/top_rated",
      data: topRatedMoviesData,
    },
    ...randomYearMovies.map((data, i) => ({
      title: `Best of ${years[i]}`,
      url: `discover/movie&primary_release_year=${years[i]}`,
      data,
      year: years[i],
    })),
  ];

  return carouselData;
}

export default async function HomePage() {
  const carouselData = await getData();

  return (
    <main className="grow">
      <Banner movies={carouselData[0]?.data?.results ?? []} />
      {carouselData.map((collection) => (
        <Carousel key={collection.title} carouselData={collection} />
      ))}
    </main>
  );
}
