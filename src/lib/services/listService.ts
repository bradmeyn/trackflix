import { db } from "@db/index";
import { lists, listItems, type List, NewList, ListItem } from "@db/schema";
import { eq, and } from "drizzle-orm";

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

export async function getList(
  userId: string,
  name?: string
): Promise<List | undefined> {
  try {
    let query = db.select().from(lists).where(eq(lists.userId, userId));

    if (name) {
      query = query.where(eq(lists.name, name));
    }

    const list: List[] = await query.execute();

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

export async function getListItem(
  listId: number,
  movieId: number
): Promise<ListItem | undefined> {
  try {
    console.log("listId", listId);
    console.log("movieId", movieId);

    const listItem: ListItem[] = await db
      .select()
      .from(listItems)
      .where(and(eq(listItems.listId, listId), eq(listItems.movieId, movieId)))
      .execute();

    console.log("listItem", listItem);

    return listItem[0];
  } catch (error) {
    console.error("Failed to fetch list item:", error);
    throw new Error("Failed to fetch list item.");
  }
}

export async function getListItems(listId: number): Promise<ListItem[]> {
  try {
    const listItems: ListItem[] = await db.query.listItems.findMany({
      where: (listItem) => eq(listItem.listId, listId),
    });

    return listItems;
  } catch (error) {
    console.error("Failed to fetch list items:", error);
    throw new Error("Failed to fetch list items.");
  }
}

export async function addListItem(
  listId: number,
  movieId: number
): Promise<ListItem> {
  try {
    console.log("ADDING LIST ITEM");
    console.log("listId", listId);
    console.log("movieId", movieId);

    const listItem = await db
      .insert(listItems)
      .values({ listId, movieId })
      .execute();

    return listItem[0];
  } catch (error) {
    console.error("Failed to add list item:", error);
    throw new Error("Failed to add list item.");
  }
}

export async function deleteListItem(listId: number, movieId: number) {
  try {
    await db
      .delete(listItems)
      .where(and(eq(listItems.listId, listId), eq(listItems.movieId, movieId)))
      .execute();
  } catch (error) {
    console.error("Failed to remove list item:", error);
    throw new Error("Failed to remove list item.");
  }
}
