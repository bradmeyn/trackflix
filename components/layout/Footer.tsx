import React from 'react';

const Footer = () => {
  return (
    <footer className='p-3 bg-slate-800 items-center text-neutral-content text-slate-400 '>
      <div className='text-center'>
        <p className='mx-auto'>
          Developed by{' '}
          <a
            href={'https://www.bradmeyn.com'}
            target='_blank'
            rel='noreferrer'
            className='text-white hover:underline underline-offset-2 hover:text-cyan-500'
          >
            Brad Meyn
          </a>
        </p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
