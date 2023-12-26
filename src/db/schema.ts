import {
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
});

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type

// List table for Watchlist & Seenlist
export const lists = mysqlTable("list", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

export type List = typeof lists.$inferSelect; // return type when queried
export type NewList = typeof lists.$inferInsert; // insert type

export const listItems = mysqlTable(
  "listItem",
  {
    listId: int("listId").notNull(),
    movieId: int("movieId").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (item) => ({
    compoundKey: primaryKey(item.listId, item.movieId),
  })
);

// One User to Many Lists Relation
export const userRelations = relations(users, ({ many }) => ({
  lists: many(lists),
}));

export const listRelations = relations(lists, ({ one, many }) => ({
  // Lists are associated with One User
  user: one(users, {
    fields: [lists.userId],
    references: [users.id],
  }),
  listItems: many(listItems),
}));

export const listItemRelations = relations(listItems, ({ one, many }) => ({
  // List Items are associated with One List
  list: one(lists, {
    fields: [listItems.listId],
    references: [lists.id],
  }),
}));

export type ListItem = typeof listItems.$inferSelect; // return type when queried
export type NewListItem = typeof listItems.$inferInsert; // insert type

// Users and Accounts Relation
export const userAccountRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

// Users and Sessions Relation
export const userSessionRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));

export const ratings = mysqlTable("rating", {
  id: int("id").primaryKey().autoincrement(),
  rating: int("rating").notNull(),
  movie_id: int("movie_id").notNull(),
  user_id: int("user_id"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

export const ratingRelations = relations(ratings, ({ one }) => ({
  user: one(users, {
    fields: [ratings.user_id],
    references: [users.id],
  }),
}));

// Users and Ratings Relation
export const userRatingsRelations = relations(users, ({ many }) => ({
  ratings: many(ratings),
}));
