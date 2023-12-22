import { db } from "@db/index";
import { lists, type List, NewList } from "@db/schema";
import { eq } from "drizzle-orm";

export async function createList(newList: NewList): Promise<List> {
  try {
    const success = await db.insert(lists).values(newList);
    console.log("List created:", success);
    if (!success) throw new Error("Failed to create list.");

    // Assuming `name` is unique per user, or you might need another identifier
    const createdList = await db
      .select()
      .from(lists)
      .where(eq(lists.name, newList.name))
      .execute();

    return createdList[0] as List;
  } catch (error) {
    console.error("Failed to create list:", error);
    throw new Error("Failed to create list.");
  }
}

export async function getList(id: number): Promise<List | undefined> {
  try {
    const list: List[] = await db
      .select()
      .from(lists)
      .where(eq(lists.id, id))
      .execute();

    if (list.length === 0) {
      console.log("List not found.");
      return undefined;
    }

    return list[0];
  } catch (error) {
    console.error("Failed to fetch list:", error);
    throw new Error("Failed to fetch list.");
  }
}

export async function updateList(
  id: number,
  updatedFields: Partial<NewList>
): Promise<List> {
  try {
    const success = await db
      .update(lists)
      .set(updatedFields)
      .where(eq(lists.id, id))
      .execute();

    if (!success) throw new Error("Failed to update list.");

    const updatedList = await db
      .select()
      .from(lists)
      .where(eq(lists.id, id))
      .execute();

    return updatedList[0] as List;
  } catch (error) {
    console.error("Failed to update list:", error);
    throw new Error("Failed to update list.");
  }
}

export async function addWatchlistItem(
  movieId: string,
  userId: string
): Promise<List> {
  try {
    // Get user's watchlist

    const list: List[] = await db
      .select()
      .from(lists)
      .where(eq(lists.name, "Watchlist"))
      .where(eq(lists.userId, userId))
      .execute();

    if (list.length === 0) {
      console.log("List not found.");
      return undefined;
    }

    return list[0];
  } catch (error) {
    console.error("Failed to fetch list:", error);
    throw new Error("Failed to fetch list.");
  }
}
