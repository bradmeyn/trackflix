import { useState } from "react";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type Props = {
  releaseYears: { min: number; max: number };
  setReleaseYears: (range: { min: number; max: number }) => void;
};

export default function YearsFilter({ releaseYears, setReleaseYears }: Props) {
  const [yearRange, setYearRange] = useState([
    releaseYears.min,
    releaseYears.max,
  ]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYearRange([parseInt(e.target.value), yearRange[1]]);
    setReleaseYears({ min: parseInt(e.target.value), max: yearRange[1] });
  };

  const handleEndYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYearRange([yearRange[0], parseInt(e.target.value)]);
    setReleaseYears({ min: yearRange[0], max: parseInt(e.target.value) });
  };

  const handleReset = () => {
    setYearRange([1970, 2023]);
    setReleaseYears({ min: 1970, max: 2023 });
  };

  return (
    <Popover as="span">
      <Popover.Button className="flex items-center gap-2 rounded-md p-2 text-sm text-slate-300 hover:bg-slate-600 hover:text-white">
        <span>Year</span>
        <ChevronDownIcon className="w-4" />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 mt-2 min-w-[300px] rounded bg-slate-800 p-5 shadow-lg">
        <div className="mb-4 flex justify-between">
          <h4 className="text-xl font-semibold text-white">Release Year</h4>
          <button
            className="rounded px-2 py-1 text-slate-400 hover:bg-slate-500 hover:text-white"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-slate-300">After</label>
            <input
              className="range-slider w-full"
              type="range"
              min="1970"
              max="2023"
              step="1"
              value={yearRange[0]}
              onChange={handleYearChange}
            />
            <span className="font-bold text-white">{yearRange[0]}</span>
          </div>
          <div>
            <label className="block text-slate-300">Before</label>
            <input
              className="range-slider w-full"
              type="range"
              min="1970"
              max="2023"
              step="1"
              value={yearRange[1]}
              onChange={handleEndYearChange}
            />
            <span className="font-bold text-white">{yearRange[1]}</span>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
