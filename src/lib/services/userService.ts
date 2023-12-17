import { db } from "@db/index";
import { users, type User, NewUser } from "@db/schema";
import { eq } from "drizzle-orm";

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user: User[] | undefined = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function createUser(user: NewUser): Promise<User> {
  try {
    const success = await db.insert(users).values(user);
    if (!success) throw new Error("Failed to create user.");
    const newUser = await getUser(user.email);
    return newUser as User;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw new Error("Failed to create user.");
  }
}
