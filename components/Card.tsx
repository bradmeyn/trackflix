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
  const src = `https://image.tmdb.org/t/p/w400${poster}`;

  return (
    <>
      <Link href={`/movies/${id}`}>
        <div className=' w-[200px] drop-shadow-lg hover:drop-shadow-2xl border-2 border-transparent rounded-xl hover:border-slate-400 hover:cursor-pointer '>
          {/* <button className='flex justify-center right-0 top-1 px-2 text-slate-500 absolute hover:text-blue-500 text-3xl md:text-4xl'>
          <FontAwesomeIcon icon={faBookmark} />
          <FontAwesomeIcon
            icon={faPlus}
            className='text-white absolute text-base top-1.5'
          />
        </button> */}
          <Image
            className='rounded-xl'
            loader={() => src}
            src={src}
            width={200}
            height={400}
            alt={title}
          />
        </div>
      </Link>
    </>
  );
};

export default Card;
