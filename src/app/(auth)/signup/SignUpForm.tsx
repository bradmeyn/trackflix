"use client";

import { register } from "@lib/actions";
// @ts-expect-error
import { useFormState, useFormStatus } from "react-dom";
import FormField from "../FormField";
import { SubmitButton } from "../SubmitButton";
import { FormErrorMessage } from "../FormErrorMessage";

const formFields = [
  {
    label: "First name",
    name: "firstName",
    type: "text",
    placeholder: "Brad",
  },
  {
    label: "Last name",
    name: "lastName",
    type: "text",
    placeholder: "Meyn",
  },
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

export default function SignUpForm() {

console.log(process.env.DB_URI);

  const [errorMessage, dispatch] = useFormState(register, undefined);
  const { pending } = useFormStatus();
  return (
    <form action={dispatch}>
      <div className="mb-10 grid grid-cols-2 gap-3">
        {formFields.map((field) => {
          if (field.name === "firstName" || field.name === "lastName") {
            return (
              <>
                <div className="col-span-2 md:col-span-1">
                  <FormField key={field.name} {...field} />
                </div>
              </>
            );
          } else {
            return (
              <>
                <div className="col-span-2">
                  <FormField key={field.name} {...field} />
                </div>
              </>
            );
          }
        })}
      </div>
      {errorMessage && (
        <FormErrorMessage errorMessage={errorMessage as string} />
      )}
      <SubmitButton pending={pending} label={"Sign Up"} />
    </form>
  );
}
