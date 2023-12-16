"use client";

import { authenticate } from "@lib/actions";
// @ts-expect-error
import { useFormState, useFormStatus } from "react-dom";
import { z } from "zod";
import FormField from "../FormField";
import { FormErrorMessage } from "../FormErrorMessage";
import { SubmitButton } from "../SubmitButton";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
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
      <div className="mb-10 grid  gap-5">
        {formFields.map((field) => (
          <>
            <FormField key={field.name} {...field} />
          </>
        ))}
      </div>
      {errorMessage && (
        <FormErrorMessage errorMessage={errorMessage as string} />
      )}
      <SubmitButton pending={pending} label={"Login"} />
    </form>
  );
}
