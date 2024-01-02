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
    <Popover as="span">
      <Popover.Button className="flex  items-center gap-2 rounded-md p-2 text-slate-300 hover:bg-slate-600 hover:text-white">
        <span>Rating</span>
        <ChevronDownIcon className="w-4" />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 mt-2 min-w-[300px] rounded bg-slate-800 p-5 shadow-lg">
        <div className="mb-3 flex justify-between">
          <h4 className="text-xl font-semibold text-white">Rating</h4>
          <button
            className="rounded px-2 py-1 text-slate-400 hover:bg-slate-500 hover:text-white"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <div>
          <label className="mb-2 block text-slate-300">Minimum Rating</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={userRating}
            onChange={handleRatingChange}
            className="w-full"
          />
          <div className="flex items-center gap-2">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            <span> {userRating.toFixed(1)}</span>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
