import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';

import useOutsideClick from '@/hooks/useOutsideClick';
import RangeSlider from './RangeSlider';

export default function YearsFilter() {
  const [isActive, setIsActive] = useState(false);
  const [yearRange, setYearRange] = useState([1970, 2023]);
  const filterContainer = useRef<HTMLDivElement>(null);

  useOutsideClick(filterContainer, () => {
    if (isActive) {
      setIsActive(false);
    }
  });

  const toggleIsActive = () => setIsActive((prev) => !prev);

  return (
    <span ref={filterContainer}>
      <button
        onClick={toggleIsActive}
        className={`rounded-md p-2  ${
          isActive
            ? 'bg-slate-600 text-white'
            : 'text-slate-300 hover:bg-slate-600 hover:text-white'
        }`}
      >
        <span className='mr-2'>Release Year</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {isActive ? (
        <div
          className={
            'absolute z-10 mt-1 w-96 rounded bg-slate-700 p-5 shadow-lg'
          }
        >
          <div className='mb-3 flex justify-between'>
            <h4 className='text-xl text-white'>Release Year</h4>
            <button>Reset</button>
          </div>
          <div>
            <RangeSlider min={1970} max={2023} step={1} />
          </div>
        </div>
      ) : (
        ''
      )}
    </span>
  );
}
