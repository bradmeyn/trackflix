import { useState } from "react";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon, StarIcon } from "@heroicons/react/24/solid";

type Props = {
  userRating: number;
  setUserRating: (rating: number) => void;
};

export default function UserRatingFilter({ userRating, setUserRating }: Props) {
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = parseFloat(e.target.value);
    setUserRating(newRating);
  };

  const handleReset = () => {
    setUserRating(0);
  };

  return (
    <Popover as="span" className="relative">
      <Popover.Button className="flex items-center gap-2 rounded-md p-2 text-slate-300 hover:bg-slate-600 hover:text-white">
        <span>User Rating</span>
        <ChevronDownIcon className="w-4" />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 mt-1 w-96 rounded bg-slate-700 p-5 shadow-lg">
        <div className="mb-3 flex justify-between">
          <h4 className="text-xl text-white">User Rating</h4>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div>
          <div className="flex justify-between">
            <label className="text-white">Minimum Rating:</label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={userRating}
              onChange={handleRatingChange}
            />
            <span>
              <StarIcon className="h-5 w-5 text-yellow-500" />
              {userRating.toFixed(1)}
            </span>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
