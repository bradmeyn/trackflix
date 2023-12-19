"use client";

import { authenticateUser } from "@lib/actions";
// @ts-expect-error
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";

import FormField from "../FormField";
import { FormErrorMessage } from "../FormErrorMessage";
import { SubmitButton } from "../SubmitButton";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticateUser, undefined);
  const { pending } = useFormStatus();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <form action={dispatch}>
      <div className="mb-8 grid gap-2">
        <FormField
          label="Email"
          type="email"
          name="email"
          placeholder="name@mail.com"
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          placeholder="********"
        />
      </div>

      {errorMessage ? (
        <FormErrorMessage errorMessage={errorMessage as string} />
      ) : null}
      <SubmitButton pending={pending} label={"Login"} />
    </form>
  );
}
