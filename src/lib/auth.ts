import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "../../auth.config";
import { z } from "zod";
import { getUser } from "@services/userService";
import { compare } from "bcryptjs";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@db/index";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // authorize is called on POST /api/auth/signin
      async authorize(credentials, req) {
        const validationResult = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (validationResult.success) {
          const { email, password } = validationResult.data;
          const user = await getUser(email);
          if (!user) {
            console.log("User not found:", email);
            return null;
          }

          const passwordsMatch = await compare(password, user.password);

          if (passwordsMatch) {
            console.log("User authenticated:", email);
            return user as any;
          } else {
            console.log("Passwords do not match:", email);
          }
        } else {
          console.log("Invalid credentials:", validationResult);
        }
        console.log("Failed to authorize user");
        return null;
      },
    }),
  ],
});
