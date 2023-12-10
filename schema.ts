import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const lists = pgTable("lists", {
  id: serial("id").primaryKey(),
  name: text("name"),
  userId: serial("user_id").references(users.id),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});
