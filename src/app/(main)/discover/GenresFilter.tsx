import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ChangeEvent } from "react";

interface MovieGenreFilter {
  id: number;
  name: string;
  selected: boolean;
}

interface Props {
  genres: MovieGenreFilter[];
  setGenres: (newGenres: MovieGenreFilter[]) => void;
}

export default function GenresFilter({ genres, setGenres }: Props) {
  const handleGenreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedGenres = genres.map((genre) => {
      if (Number(e.target.value) === genre.id) {
        return { ...genre, selected: e.target.checked };
      } else {
        return genre;
      }
    });
    setGenres(updatedGenres);
  };

  const handleReset = () => {
    const resetGenres = genres.map((genre) => ({ ...genre, selected: false }));
    setGenres(resetGenres);
  };

  return (
    <Popover as="span" className="left-0 inline-block">
      <Popover.Button className="flex items-center gap-2 rounded-md p-2 text-slate-300 hover:bg-slate-600 hover:text-white">
        <span>Genres</span>
        <ChevronDownIcon className="w-4" />
      </Popover.Button>

      <Popover.Panel className="content absolute left-4 z-10 mt-2 rounded bg-slate-800 p-5 shadow-lg">
        <div className="mb-3 flex justify-between">
          <h4 className="text-xl font-semibold text-white">Genres</h4>
          <button
            className="rounded px-2 py-1 text-slate-400 hover:bg-slate-500 hover:text-white"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {genres.map((genre) => (
            <label
              key={genre.id}
              className={`flex cursor-pointer items-center gap-2 hover:text-white ${
                genre.selected ? "text-white" : "text-slate-400"
              }`}
            >
              <input
                type="checkbox"
                value={genre.id}
                checked={genre.selected}
                onChange={handleGenreChange}
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
}
