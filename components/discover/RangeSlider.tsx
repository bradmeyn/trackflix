import React, { ChangeEvent, useState } from 'react';

const RangeSlider = ({ step, min, max }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;
  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = +e.target.value;

    const newMinVal = Math.min(value, maxValue - step);
    setMinValue(newMinVal);
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = +e.target.value;

    const newMaxVal = Math.max(value, minValue + step);
    setMaxValue(newMaxVal);
  };

  return (
    <div className='mt-4 flex items-center justify-center'>
      <div className={'w-96'}>
        <input
          type='range'
          value={minValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
          className='hidden'
        />
        <input
          type='range'
          value={maxValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
          className='hidden'
        />
        <div className='relative flex h-3 items-center'>
          <div className='control-wrapper absolute w-full'>
            <div
              className='control h-5 w-5 cursor-grab rounded-full bg-blue-400'
              style={{ left: `${minPos}%` }}
            />
            <div className='rail absolute h-3 w-full'>
              <div
                className='inner-rail absolute h-3 w-full'
                style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
              />
            </div>
            <div
              className='control h-5 w-5 cursor-grab rounded-full bg-blue-400'
              style={{ left: `${maxPos}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
