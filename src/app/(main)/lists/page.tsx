import Image from "next/image";
import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function ListsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }

  // Get User Watchlist

  return (
    <main className=" grow">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-8xl">My Lists</h1>
      </div>
    </main>
  );
}
