"use client";

import { authenticateUser } from "@lib/actions";
// @ts-expect-error
import { useFormState, useFormStatus } from "react-dom";

import FormField from "../FormField";
import { FormErrorMessage } from "../FormErrorMessage";
import { SubmitButton } from "../SubmitButton";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticateUser, undefined);
  const { pending } = useFormStatus();

  const formFields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  return (
    <form action={dispatch}>
      <FormField
        key="email"
        label="Email"
        type="email"
        name="email"
        placeholder="name@mail.com"
      />
      <FormField
        key="password"
        label="Password"
        type="password"
        name="password"
        placeholder="********"
      />

      {errorMessage ? (
        <FormErrorMessage errorMessage={errorMessage as string} />
      ) : null}
      <SubmitButton pending={pending} label={"Login"} />
    </form>
  );
}
