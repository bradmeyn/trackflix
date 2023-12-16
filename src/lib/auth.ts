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

      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await compare(password, user.password);

          if (passwordsMatch) return user as any;
        }

        return null;
      },
    }),
  ],
});
