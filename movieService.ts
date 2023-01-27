import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

const params = new URLSearchParams({
  api_key: API_KEY!,
  language: 'en-AU',
});

const movieService = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export const getPopularMovies = async () => {
  const response = await movieService.get(`trending/movie/week?${params}`);
  return response;
};

export const getTopRatedMovies = async () => {
  const response = await movieService.get(`movie/top_rated?${params}`);
  return response;
};

export const getMovie = async (movieId: string | number) => {
  const response = await movieService.get(
    `movie/${movieId}?${params}&append_to_response=credits`
  );
  return response;
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
