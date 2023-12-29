import Image from "next/image";
import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";
import Lists from "@/app/(main)/lists/Lists";
import { getListItems } from "@/lib/services/listService";
import { getMovie } from "@/lib/services/tmdbService";

type Props = {
  params: { id: string };
};

export default async function ListsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }

  // Get User Watchlist

  const watchlistIds = await getListItems(session.user.watchlistId);

  const watchlist = await Promise.all(
    watchlistIds?.map(async (item) => {
      const response = await getMovie(item.movieId);
      return response?.data;
    })
  );

  const lists = [
    {
      id: session.user.watchlistId,
      name: "Watchlist",
      movies: watchlist,
    },
    {
      name: "Seen",
      movies: [],
    },
    {
      name: "Favourites",
      movies: [],
    },
  ];

  return (
    <main className="grow">
      <div className="container mx-auto max-w-[800px] py-10 px-4">
        <h1 className="mb-4 text-2xl font-bold md:mb-8 md:text-4xl">
          My Lists
        </h1>

        <Lists lists={lists} />
      </div>
    </main>
  );
}
