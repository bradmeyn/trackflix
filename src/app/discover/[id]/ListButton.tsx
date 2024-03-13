import { auth } from "@/lib/auth";
import Link from "next/link";
import {
  getListItem,
  addListItem,
  deleteListItem,
} from "@/lib/services/listService";
import { BookmarkIcon, HeartIcon, CheckIcon } from "@heroicons/react/24/solid"; // Import icons for each list type
import { revalidatePath } from "next/cache";

type Props = {
  movieId: number;
  listType: string;
};

export default async function ListButton({ movieId, listType }: Props) {
  const session = await auth();
  let bgColor, hoverColor, Icon;
  switch (listType) {
    case "Favourites":
      bgColor = "bg-pink-600";
      hoverColor = "hover:bg-pink-600";
      xw;
      Icon = HeartIcon;
      break;
    case "Seen":
      bgColor = "bg-green-600";
      hoverColor = "hover:bg-green-600";
      Icon = CheckIcon;
      break;
    default:
      bgColor = "bg-sky-600";
      hoverColor = "hover:bg-sky-600";
      Icon = BookmarkIcon;
  }

  const listId = session.user[`${listType.toLowerCase()}Id`];
  const listItem = await getListItem(listId, movieId);

  const handleList = async () => {
    "use server";
    if (listItem) {
      await deleteListItem(listId, movieId);
    } else {
      await addListItem(listId, movieId);
    }
    revalidatePath(`/discover/${movieId}`);
  };

  // Define background color and icon based on list type and presence in the list

  switch (listType) {
    case "Favourites":
      bgColor = "bg-pink-600";
      hoverColor = "hover:bg-pink-600";
      Icon = HeartIcon;
      break;
    case "Seen":
      bgColor = "bg-green-600";
      hoverColor = "hover:bg-green-600";
      Icon = CheckIcon;
      break;
    default:
      bgColor = "bg-sky-600";
      hoverColor = "hover:bg-sky-600";
      Icon = BookmarkIcon;
  }

  if (!listItem) {
    bgColor = "bg-slate-600";
  } else {
    hoverColor = "hover:bg-slate-700";
  }

  return (
    <>
      <button
        type="submit"
        className={`mb-4 flex items-center gap-2 rounded-full p-2 text-sm text-white ${bgColor} ${hoverColor}`}
      >
        <Icon className="w-5" />
      </button>
    </>
  );
}
