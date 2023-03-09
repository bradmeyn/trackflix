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

export interface MovieSearchData {
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

    const movies = response.data.results;
    return movies;
  } catch (error) {
    console.log(error);

    return [];
  }
};

export const getMovies = async (url: string, page: string | number = 1) => {
  try {
    const response: AxiosResponse<MovieSearchData> = await movieService.get(
      `${url}${params}&page=${page}`
    );

    return response.data;
  } catch (error) {
    console.log(error);

    return {
      page: 0,
      total_pages: 0,
      total_results: 0,
      results: [],
    };
  }
};

export const discoverMovies = async (
  year: number,
  page: string | number = 1
) => {
  try {
    const response: AxiosResponse<MovieSearchData> = await movieService.get(
      `discover/movie?${params}&primary_release_year=${year}&page=${page}&sort_by=revenue.desc`
    );

    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error(`Failed to movie`);
    return {
      page: 0,
      total_pages: 0,
      total_results: 0,
      results: [],
    };
  }
};
