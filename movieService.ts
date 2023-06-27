import axios, { AxiosResponse } from 'axios';
import { IMovie } from './types/types';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

const movieService = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: API_KEY,
    language: 'en-AU',
    sort_by: 'revenue.desc',
    include_adult: false,
  },
});

export interface MovieData {
  page: number;
  total_pages: number;
  total_results: number;
  results: IMovie[];
}

export const getMovies = async (
  url: string,
  params?: { [key: string]: any }
) => {
  try {
    const response: AxiosResponse<MovieData> = await movieService.get(url, {
      params,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch movies.');
  }
};

export const getMovie = async (movieId: string | number) => {
  try {
    const response: AxiosResponse<IMovie> = await movieService.get(
      `movie/${movieId}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch movie.');
  }
};

// Fetch movies by search query (navbar)
export const searchMovies = async (query: string): Promise<IMovie[]> => {
  try {
    const response: AxiosResponse<MovieData> = await movieService.get(
      `/search/movie?query=${query}`
    );

    const movies = response.data.results;
    return movies;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch single movie (detail page)
// export const getMovie = async (movieId: string | number) => {
//   try {
//     const response = await movieService.get(
//       `movie/${movieId}&append_to_response=credits`
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//     throw new Error('Failed to fetch popular movies.');
//   }
// };

// Fetch movies by search query (navbar)
// export const searchMovies = async (query: string): Promise<IMovie[]> => {
//   try {
//     const response: AxiosResponse<MovieSearchData> = await movieService.get(
//       `search/movie&query=${query}&page=1`
//     );

//     const movies = response.data.results;
//     return movies;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// export const getMovies = async (url: string, page: string | number = 1) => {
//   try {
//     const response: AxiosResponse<MovieSearchData> = await movieService.get(
//       `${url}&page=${page}`
//     );

//     return response.data;
//   } catch (error) {
//     console.log(error);

//     return {
//       page: 0,
//       total_pages: 0,
//       total_results: 0,
//       results: [],
//     };
//   }
// };

// export const getMoviesByYear = async (
//   year: number,
//   page: string | number = 1
// ) => {
//   try {
//     const response: AxiosResponse<MovieSearchData> = await movieService.get(
//       `discover/movie/?primary_release_year=${year}&page=${page}`
//     );

//     return response.data;
//   } catch (error) {
//     console.log(error);

//     return {
//       page: 0,
//       total_pages: 0,
//       total_results: 0,
//       results: [],
//     };
//   }
// };

// export interface MovieParams {
//   releaseYears: {
//     min: number;
//     max: number;
//   };
//   genres: number[];
//   userRating: number;
//   page: string | number;
// }

// export const getFilteredMovies = async ({
//   releaseYears: { min, max },
//   genres,
//   page,
//   userRating,
// }: MovieParams) => {
//   try {
//     const response: AxiosResponse<MovieSearchData> = await movieService.get(
//       `discover/movie&primary_release_date.gte=${min}-01-01&primary_release_date.lte=${max}-12-31&with_genres=${genres.join(
//         ','
//       )}&vote_average.gte=${userRating}&page=${page}`
//     );

//     return response.data;
//   } catch (error) {
//     return {
//       page: 0,
//       total_pages: 0,
//       total_results: 0,
//       results: [],
//     };
//   }
// };
