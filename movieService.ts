import axios, { AxiosResponse } from 'axios';
import { IMovie } from './types/types';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

const params = new URLSearchParams({
  api_key: API_KEY!,
  language: 'en-AU',
});

const movieService = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export const getPopularMovies = async (): Promise<IMovie[]> => {
  try {
    const response = await movieService.get(`trending/movie/week?${params}`);
    const popularMovies: IMovie[] = response.data.results;
    return popularMovies;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch popular movies.');
  }
};

export const getTopRatedMovies = async (): Promise<IMovie[]> => {
  try {
    const response = await movieService.get(`movie/top_rated?${params}`);
    const topRatedMovies: IMovie[] = response.data.results;
    return topRatedMovies;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch popular movies.');
  }
};

export const getMovie = async (movieId: string | number) => {
  try {
    const response = await movieService.get(
      `movie/${movieId}?${params}&append_to_response=credits`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch popular movies.');
  }
};

interface MovieSearchData {
  page: number;
  total_pages: number;
  total_results: number;
  results: IMovie[];
}

export const searchMovies = async (query: string): Promise<IMovie[]> => {
  try {
    const response: AxiosResponse<MovieSearchData> = await movieService.get(
      `search/movie?${params}&query=${query}&page=1&include_adult=false`
    );
    console.log(response);
    const movies = response.data.results;
    return movies;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to fetch popular movies.');
    return [];
  }
};

export const getMoviesByYear = async (year: string) => {
  try {
    const response: AxiosResponse<MovieSearchData> = await movieService.get(
      `discover/movie?${params}&primary_release_year=${year}&sort_by=revenue.desc`
    );

    console.log(response);
    const movies = response.data.results;
    return movies;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to fetch popular movies.');
    return [];
  }
};

//  const year = Math.floor(Math.random() * 51) + 1970;
//    {
//      title: `Biggest Movies of ${year - 1}`,
//      url: `https://api.themoviedb.org/3/discover/movie?${params}&primary_release_year=${
//        year - 1
//      }&sort_by=revenue.desc`,
//    },
//    {
//      title: `Biggest Movies of ${year}`,
//      url: `https://api.themoviedb.org/3/discover/movie?${params}&primary_release_year=${year}&sort_by=revenue.desc`,
//    },
//    {
//      title: `Biggest Movies of ${year + 1}`,
//      url: `https://api.themoviedb.org/3/discover/movie?${params}&primary_release_year=${
//        year + 1
//      }&sort_by=revenue.desc`,
//    },
//  ];

// const collections = [
//   {
//     title: 'Popular Now',
//     url: `https://api.themoviedb.org/3/trending/movie/week?${params}`,
//   },
//   {
//     title: 'Top Rated of All Time',
//     url: `https://api.themoviedb.org/3/movie/top_rated?${params}`,
//   },
//   {
//     title: `Biggest Movies of ${year - 1}`,
//     url: `https://api.themoviedb.org/3/discover/movie?${params}&primary_release_year=${
//       year - 1
//     }&sort_by=revenue.desc`,
//   },
//   {
//     title: `Biggest Movies of ${year}`,
//     url: `https://api.themoviedb.org/3/discover/movie?${params}&primary_release_year=${year}&sort_by=revenue.desc`,
//   },
//   {
//     title: `Biggest Movies of ${year + 1}`,
//     url: `https://api.themoviedb.org/3/discover/movie?${params}&primary_release_year=${
//       year + 1
//     }&sort_by=revenue.desc`,
//   },
// ];

// const url = `https://api.themoviedb.org/3/movie/${movieId}?${params}&append_to_response=credits`;
// export const getMovie = () => {
//   return movieService.get();
// };
