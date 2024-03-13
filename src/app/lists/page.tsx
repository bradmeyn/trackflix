import Lists from "@/app/lists/Lists";
import { getListItems } from "@/lib/services/listService";
import { getMovie } from "@/lib/services/tmdbService";

export default async function ListsPage() {
  const lists = [
    {
      id: 1,
      name: "Watchlist",
      movies: [],
    },
    {
      id: 2,
      name: "Seen",
      movies: [],
    },
    {
      id: 3,
      name: "Favourites",
      movies: [],
    },
  ];

  return (
    <main className="grow">
      <div className="container mx-auto max-w-[800px] px-4 py-10">
        <h1 className="mb-4 text-2xl font-bold md:mb-8 md:text-4xl">
          My Lists
        </h1>
        <Lists lists={lists} />
      </div>
    </main>
  );
}
