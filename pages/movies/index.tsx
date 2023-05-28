import Head from 'next/head';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Inter } from '@next/font/google';
import { getMovies, MovieData } from '@/movieService';
import Carousel from '@/components/Carousel';
import LargeCarousel from '@/components/LargeCarousel';
const inter = Inter({ subsets: ['latin'] });

export default function Movies({
  carouselData,
}: {
  carouselData: CarouselData[];
}) {
  return (
    <>
      <Head>
        <title>Watchflix | Popular</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex min-h-screen grow flex-col bg-gradient-to-t from-slate-800 to-slate-900 '>
        <Navbar />
        <main className={'flex grow flex-col '}>
          <LargeCarousel movies={carouselData[0].data.results} />
          {carouselData.map((collection) => (
            <Carousel key={collection.title} carouselData={collection} />
          ))}
        </main>
        <Footer />
      </div>
    </>
  );
}

export interface CarouselData {
  title: string;
  url: string;
  data: MovieData;
  year?: number;
}

export async function getServerSideProps() {
  const popularMoviesData = await getMovies('trending/movie/week', { page: 1 });
  const topRatedMoviesData = await getMovies('movie/top_rated', { page: 1 });

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
      getMovies('discover/movie', { primary_release_year: year })
    )
  );

  const carouselData: CarouselData[] = [
    {
      title: 'Popular Now',
      url: 'trending/movie/week',
      data: popularMoviesData,
    },
    {
      title: 'All Time Classics',
      url: 'movie/top_rated',
      data: topRatedMoviesData,
    },
    ...randomYearMovies.map((data, i) => ({
      title: `Best of ${years[i]}`,
      url: `discover/movie&primary_release_year=${years[i]}`,
      data,
      year: years[i],
    })),
  ];

  return {
    props: {
      carouselData,
    },
  };
}
