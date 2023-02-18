import logo from '../.././public/logo.png';
import Image from 'next/image';
import Search from '../Search/SearchModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/pro-light-svg-icons';
import SearchModal from '../Search/SearchModal';

const Navbar = () => {
  return (
    <nav className='bg-slate-900 p-3  '>
      <div className='container mx-auto flex w-full items-center justify-between md:justify-between'>
        <a className='flex items-center  text-white'>
          <div className=''>
            <Image src={logo} alt='' className='w-32' />
          </div>
        </a>
        <SearchModal />
        <a className='flex items-center align-middle hover:text-white'>
          <FontAwesomeIcon icon={faCircleUser} className='mr-2  text-3xl' />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
