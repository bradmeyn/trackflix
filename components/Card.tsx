import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBookmark } from '@fortawesome/pro-solid-svg-icons';
import { faBookmark as falStar } from '@fortawesome/pro-regular-svg-icons';

import Image from 'next/image';
import Link from 'next/link';

const Card = ({
  id,
  title,
  poster,
}: {
  id: number;
  title: string;
  poster: string;
}) => {
  const src = `https://image.tmdb.org/t/p/w200${poster}`;

  return (
    <>
      <Link href={`/movies/${id}`}>
        <div className='relative w-[200px] rounded-xl border-4 border-transparent transition-transform duration-300 hover:scale-105 hover:cursor-pointer hover:border-slate-400 '>
          <Image
            loader={() => src}
            placeholder='blur'
            blurDataURL={src}
            height='0'
            width='0'
            sizes='100vw'
            className='h-auto w-full rounded-xl'
            src={src}
            alt={title}
          />
        </div>
      </Link>
    </>
  );
};

export default Card;
