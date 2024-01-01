import NextAuth from "next-auth";

import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@db/index";
import { getList, createList } from "./services/listService";

export const { auth, signIn, signOut, handlers } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // middleware to add user id to session
    async session({ session, user }) {
      session.user.id = user.id as string;

      // Refactored to use the new function for each list
      session.user.watchlistId = await handleList(user.id, "Watchlist");
      session.user.favouritesId = await handleList(user.id, "Favourites");
      session.user.seenId = await handleList(user.id, "Seen");

      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  adapter: DrizzleAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

async function handleList(userId, listName) {
  const list = await getList(userId, listName);

  if (!list) {
    console.log(`New user, creating ${listName}`);

    const newList = await createList({
      name: listName,
      userId: userId,
    });
    return newList.id;
  } else {
    return list.id;
  }
}
