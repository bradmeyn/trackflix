import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCheck,
  faBookmark,
} from '@fortawesome/pro-regular-svg-icons';

import logo from '../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import avengersPoster from '../public/landing_posters/avengers_poster.jpg';
import djangoPoster from '../public/landing_posters/django_poster.jpg';
import goodfellasPoster from '../public/landing_posters/goodfellas_poster.jpg';
import lotrPoster from '../public/landing_posters/lotr_poster.jpg';
import theDarkKnightPoster from '../public/landing_posters/the_dark_knight_poster.jpg';
import { Inter } from '@next/font/google';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Watchflix</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex min-h-screen grow flex-col bg-gradient-to-t from-blue-900 to-slate-900 '>
        <main
          className={'flex grow flex-col '}
          style={{
            backgroundImage: `linear-gradient( to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url('/background.webp')`,
          }}
        >
          <div className='container mx-auto p-4'>
            <Image src={logo} alt='' className='w-32' />
          </div>
          <div className='my-8 flex-grow text-center md:my-12'>
            <div className='mb-24'>
              <h1 className='h-100 mx-auto mb-10 text-6xl font-extrabold text-white md:mb-12  md:text-7xl lg:text-8xl   '>
                <div>Browse less.</div>
                <div>Watch more.</div>
              </h1>

              <div
                className={
                  'container mx-auto mb-10 grid max-w-[1000px] grid-cols-5 gap-4 px-5 md:gap-6'
                }
              >
                <Image
                  priority
                  className={'rounded-md'}
                  src={avengersPoster}
                  alt='Movie poster for Avengers'
                />
                <Image
                  priority
                  className={'rounded-md'}
                  src={djangoPoster}
                  alt='Movie poster for Django Unchained'
                />
                <Image
                  priority
                  className={'rounded-md'}
                  src={goodfellasPoster}
                  alt='Movie poster for Goodfellas'
                />
                <Image
                  priority
                  className={''}
                  src={lotrPoster}
                  alt='Movie poster for Lord of the Rings: Return of the King'
                />
                <Image
                  priority
                  className={'rounded-md'}
                  src={theDarkKnightPoster}
                  alt='Movie poster for '
                />
              </div>

              <p className='container mx-auto mb-10 block max-w-[800px] px-5  text-lg text-slate-200 md:text-2xl'>
                Watchflix is a tool designed to simplify your movie search, so
                you can spend less time endlessly scrolling on movie night.
              </p>
              <Link href='/movies'>
                <button className='rounded-md bg-blue-600 px-5 py-3 text-lg font-semibold hover:bg-blue-500'>
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          <footer className='items-center p-5 text-slate-400 '>
            <div className='text-center'>
              <Image
                src={logo}
                alt='Watchflix logo'
                className='mx-auto mb-2 w-20'
              />

              <p className=' mb-2 flex items-center justify-center text-sm'>
                <span className='mr-2'>Developed by</span>
                <a
                  href={'https://www.bradmeyn.com'}
                  target='_blank'
                  rel='noreferrer'
                  className='text-white underline-offset-2 hover:underline'
                >
                  Brad Meyn
                </a>
                <span className='px-2'>&#8226;</span>
                <a
                  href={'https://www.github.com/bradmeyn/watchflix'}
                  target='_blank'
                  rel='noreferrer'
                  className='flex items-center justify-center text-sm text-white underline-offset-2 hover:underline'
                >
                  <FontAwesomeIcon icon={faGithub} className='mr-2 ' />{' '}
                  <span>GitHub</span>
                </a>
              </p>

              <p className='text-xs'>
                Copyright © {new Date().getFullYear()} - All right reserved
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
