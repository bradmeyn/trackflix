import NextAuth from "next-auth";

import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@db/index";
import { getWatchlist, createList } from "./services/listService";

export const { auth, signIn, signOut, handlers } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // middleware to add user id to session
    async session({ session, user }) {
      session.user.id = user.id as string;

      // create a watchlist for the user if one doesn't exist
      const watchlist = await getWatchlist(user.id as string);

      if (!watchlist) {
        console.log("New user, creating watchlist");
        const newWatchlist = await createList({
          name: "Watchlist",
          userId: user.id as string,
        });
        session.user.watchlistId = newWatchlist.id;
      } else {
        session.user.watchlistId = watchlist.id;
      }
      return session;
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
