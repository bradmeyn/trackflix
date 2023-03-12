import logo from '../.././public/logo.png';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/pro-light-svg-icons';
import SearchModal from '../Search/SearchModal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { faCameraMovie } from '@fortawesome/pro-regular-svg-icons';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className='bg-slate-900 p-3  '>
      <div className='container mx-auto flex w-full items-center justify-between md:justify-between'>
        <div className='flex items-center'>
          <Link href={'/movies'}>
            <Image src={logo} alt='' className='w-24 md:w-32' />
          </Link>
          <Link
            href={'/discover'}
            className={`text-md ml-7 font-semibold  uppercase hover:text-white ${
              router.pathname === '/discover'
                ? ' text-white '
                : ' text-slate-400 '
            }`}
          >
            <FontAwesomeIcon icon={faCameraMovie} className={'mr-2'} />
            Discover
          </Link>
        </div>

        <SearchModal />
        <a className='flex items-center align-middle hover:text-white'>
          <FontAwesomeIcon icon={faCircleUser} className='mr-2  text-xl' />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
