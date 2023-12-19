"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { signUpSchema } from "@/lib/schemas";
import type { NewUser, User } from "@/db/schema";
import { getUser, createUser } from "@services/userService";

import { genSalt, hash } from "bcryptjs";

export async function authenticateUser(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function registerUser(newUser: unknown) {
  const validationResult = signUpSchema.safeParse(newUser);

  // validate user data
  if (validationResult.success === false) {
    return {
      error: "Invalid credentials.",
    };
  }

  const { firstName, lastName, email, password } = validationResult.data;
  console.log("New User:", newUser);
  // check if user already exists
  const existingUser: User | null = await getUser(email);
  if (existingUser) {
    return {
      error: "Account already exists, please login.",
    };
  }

  // hash password
  const encryptedPassword = await hash(password, await genSalt(10));

  // create user
  const user: NewUser = {
    firstName,
    lastName,
    email,
    password: encryptedPassword,
  };
  try {
    await createUser(user);
  } catch (error) {
    console.error("Failed to create user:", error);
    return {
      error: "Failed to create user.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      encryptedPassword,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
