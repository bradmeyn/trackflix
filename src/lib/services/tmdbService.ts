import axios, { AxiosResponse } from "axios";
import { MovieResult } from "../types/types";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

const movieService = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: API_KEY,
    language: "en-AU",
    sort_by: "revenue.desc",
    include_adult: false,
  },
});

export interface MovieData {
  page: number;
  total_pages: number;
  total_results: number;
  results: MovieResult[];
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
  }
};

export const getMovie = async (movieId: string | number) => {
  try {
    const response: AxiosResponse<MovieResult> = await movieService.get(
      `movie/${movieId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Fetch movies by search query (navbar)
export const searchMovies = async (query: string): Promise<MovieResult[]> => {
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
