"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { handleRemoveListItem } from "@/lib/actions";

export default function RemoveMovieButton({ listId, movieId }) {
  console.log("remove movie button");
  console.log("listId", listId);
  console.log("movieId", movieId);
  return (
    <form
      /* @ts-expect-error Server Component */
      action={handleRemoveListItem}
      className="ml-auto"
    >
      <input type="hidden" name="listId" value={listId} />
      <input type="hidden" name="movieId" value={movieId} />
      <button
        type="submit"
        className="flex flex-col items-center justify-center gap-2 text-sm text-white hover:text-red-400"
      >
        <TrashIcon className="w-4" />
        <span>Remove</span>
      </button>
    </form>
  );
}
