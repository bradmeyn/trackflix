import { db } from "@db/index";
import { lists, type List, NewList } from "@db/schema";
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
