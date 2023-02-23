import logo from '../.././public/logo.png';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  return (
    <footer className='items-center bg-slate-800 p-5 text-slate-400 '>
      <div className='text-center'>
        <Image src={logo} alt='Watchflix logo' className='mx-auto mb-2 w-28' />

        <p className=' mb-2 flex items-center justify-center'>
          <span className='mr-2'>Developed by</span>
          <a
            href={'https://www.bradmeyn.com'}
            target='_blank'
            rel='noreferrer'
            className='text-white underline-offset-2 hover:underline'
          >
            Brad Meyn
          </a>
        </p>
        <a
          href={'https://www.github.com/bradmeyn/watchflix'}
          target='_blank'
          rel='noreferrer'
          className='underline-offset-2text-white mb-2 flex items-center justify-center text-white hover:underline'
        >
          <FontAwesomeIcon icon={faGithub} className='mr-2 text-lg' />{' '}
          <span>GitHub</span>
        </a>

        <p className='text-xs'>
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
