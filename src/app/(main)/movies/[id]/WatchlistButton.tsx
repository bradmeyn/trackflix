import { auth } from "@/lib/auth";
import Link from "next/link";
import {
  getListItem,
  addListItem,
  deleteListItem,
} from "@/lib/services/listService";

type Props = {
  movieId: number;
};

import { BookmarkIcon } from "@heroicons/react/24/solid";
import { revalidatePath } from "next/cache";

export default async function WatchlistButton({ movieId }: Props) {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link
        href="/signin"
        className="rounded-full border-2 border-violet-600 p-2 text-lg text-white hover:bg-violet-600 "
      >
        <BookmarkIcon className="w-5" />
      </Link>
    );
  }

  const watchlistItem = await getListItem(session.user.watchlistId, movieId);

  const handleWatchlist = async () => {
    "use server";
    if (watchlistItem) {
      await deleteListItem(session.user.watchlistId, movieId);
    } else {
      await addListItem(session.user.watchlistId, movieId);
    }
    revalidatePath(`/movies/${movieId}`);
  };

  return (
    /* @ts-expect-error Server Component */
    <form action={handleWatchlist} className="w-1/2 flex-grow">
      <button
        type="submit"
        className="mb-4 flex items-center gap-1 rounded border-2 border-violet-600 bg-violet-600 p-1 text-sm text-white hover:bg-violet-700"
      >
        <BookmarkIcon className="w-4" />
        <span>
          {watchlistItem ? "Remove from Watchlist" : "Add to Watchlist"}
        </span>
      </button>
    </form>
  );
}
