import { useEffect, useRef, useState } from 'react';
// import './Search.css';
// import { Link } from 'react-router-dom';
// import useOutsideClick from '../../hooks/useOutsideClick';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/pro-solid-svg-icons';

// const SearchDropdown = ({ movies, query, closeSearch }) => {
//   const [dropdownActive, setDropDownActive] = useState(false);
//   const dropdown = useRef(null);

//   useEffect(() => {
//     setDropDownActive(true);
//   }, [movies]);

//   useOutsideClick(dropdown, () => {
//     setDropDownActive(false);
//   });

//   const handleClick = () => {
//     closeSearch();
//     setDropDownActive(false);
//   };

//   return (
//     <ul ref={dropdown} className={dropdownActive ? ' block w-full ' : 'hidden'}>
//       {movies.map((movie) => (
//         <Link id={movie.id} onClick={handleClick} to={`movies/${movie.id}`}>
//           <li className=' flex bg-slate-700 hover:bg-slate-600 border-t-2 border-slate-600'>
//             <img
//               src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
//               alt='Movie Poster'
//               className='w-20'
//             />
//             <div className='p-4'>
//               <h4 className='text-white text-lg md:text-xl pb-1'>
//                 {movie.original_title}
//               </h4>

//               <div className='text-sm md:text-md pb-2'>
//                 {new Date(movie.release_date).getFullYear()}
//               </div>
//               <span className='flex items-center'>
//                 <FontAwesomeIcon
//                   icon={faStar}
//                   className='mr-2 text-yellow-400'
//                 />
//                 <span>{Math.round(movie.vote_average * 10) / 10}</span>
//               </span>
//             </div>
//           </li>
//         </Link>
//       ))}
//     </ul>
//   );
// };

// export default SearchDropdown;
