import logo from '../.././public/logo.png';
import Image from 'next/image';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleUser } from '@fortawesome/pro-light-svg-icons';

const Navbar = () => {
  return (
    <nav className='p-3 bg-slate-800 '>
      <div className='flex md:justify-between container w-full mx-auto justify-between'>
        <a className='text-white align-middle flex items-center'>
          <div className=''>
            <Image src={logo} alt='' className='w-32' />
          </div>
        </a>
        {/* <Search /> */}
        <a className='hover:text-white align-middle flex items-center'>
          {/* <FontAwesomeIcon icon={faCircleUser} className='text-3xl  mr-2' /> */}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
