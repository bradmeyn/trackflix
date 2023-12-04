import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBookmark } from '@fortawesome/pro-solid-svg-icons';
import { faBookmark as falStar } from '@fortawesome/pro-regular-svg-icons';

import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';

const loader: ImageLoader = ({ src, width }) => {
  return `${src}?w=${width}`;
};

export default function DiscoverCard({
  id,
  title,
  poster,
}: {
  id: number;
  title: string;
  poster: string;
}) {
  const src = `https://image.tmdb.org/t/p/w200${poster}`;

  return (
    <>
      <Link
        href={`/movies/${id}`}
        className={
          'card-shadow  relative rounded-md transition-transform duration-300 hover:scale-105 hover:cursor-pointer hover:outline  hover:outline-4'
        }>
        <Image
          loader={loader}
          placeholder='blur'
          blurDataURL={src}
          height={225}
          width={150}
          sizes='100vw'
          className='h-auto w-full rounded'
          src={src}
          alt={title}
        />
      </Link>
    </>
  );
}
