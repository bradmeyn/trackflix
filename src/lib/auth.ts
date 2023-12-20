// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import { authConfig } from "../../auth.config";

// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { db } from "@db/index";

// export const { auth, signIn, signOut, handlers } = NextAuth({
//   pages: {
//     signIn: "/signin",
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }
//       return true;
//     },
//   },
//   adapter: DrizzleAdapter(db),
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
// });
