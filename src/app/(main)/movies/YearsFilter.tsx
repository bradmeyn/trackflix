import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type Props = {
  releaseYears: { min: number; max: number };
  setReleaseYears: (range: { min: number; max: number }) => void;
};

export default function YearsFilter({ releaseYears, setReleaseYears }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [yearRange, setYearRange] = useState([
    releaseYears.min,
    releaseYears.max,
  ]);
  const filterContainer = useRef<HTMLDivElement>(null);

  useOutsideClick(filterContainer, () => {
    if (isActive) {
      setIsActive(false);
    }
  });

  const toggleIsActive = () => setIsActive((prev) => !prev);

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
    <span ref={filterContainer}>
      <button
        onClick={toggleIsActive}
        className={`rounded-md p-2  ${
          isActive
            ? "bg-slate-600 text-white"
            : "text-slate-300 hover:bg-slate-600 hover:text-white"
        }`}
      >
        <span className="mr-2">Release Year</span>
        <ChevronDownIcon />
      </button>
      {isActive ? (
        <div
          className={
            "absolute z-10 mt-1 w-96 rounded bg-slate-700 p-5 shadow-lg"
          }
        >
          <div className="mb-3 flex justify-between">
            <h4 className="text-xl text-white">Release Year</h4>
            <button onClick={handleReset}>Reset</button>
          </div>
          <div>
            <div className="flex justify-between">
              <label className="text-white">Start Year:</label>
              <input
                type={"range"}
                min="1970"
                max="2023"
                step="1"
                value={yearRange[0]}
                onChange={handleYearChange}
              ></input>
              <span>{yearRange[0]}</span>
            </div>
            <div className="flex justify-between">
              <label className="text-white">End Year:</label>
              <input
                type={"range"}
                min="1970"
                max="2023"
                step="1"
                value={yearRange[1]}
                onChange={handleEndYearChange}
              ></input>
              <span>{yearRange[1]}</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </span>
  );
}
