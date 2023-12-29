"use server";

import { revalidatePath } from "next/cache";
import { deleteListItem } from "@/lib/services/listService";

export async function handleRemoveListItem(formData: FormData) {
  "use server";

  const listId = formData.get("listId");
  const movieId = formData.get("movieId");

  if (!listId || !movieId) {
    return;
  }

  if (typeof listId !== "number" || typeof movieId !== "number") {
    return;
  }

  await deleteListItem(listId, movieId);
  revalidatePath(`/lists`);
}
