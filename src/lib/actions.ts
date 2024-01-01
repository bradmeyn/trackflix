"use server";

import { revalidatePath } from "next/cache";
import { deleteListItem } from "@/lib/services/listService";

export async function handleRemoveListItem(formData: FormData) {
  "use server";

  console.log("handleRemoveListItem");
  const listId = +formData.get("listId");
  const movieId = +formData.get("movieId");

  console.log("listId", listId);
  console.log("movieId", movieId);

  if (!listId || !movieId) {
    console.log("listId or movieId is undefined");
    return;
  }

  if (typeof listId !== "number" || typeof movieId !== "number") {
    console.log("listId or movieId is not a number");
    return;
  }

  await deleteListItem(listId, movieId);
  revalidatePath(`/lists`);
}
