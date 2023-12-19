"use client";

import { registerUser } from "@lib/actions";
// @ts-expect-error
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";

import FormField from "../FormField";
import { SubmitButton } from "../SubmitButton";

import { FormErrorMessage } from "../FormErrorMessage";
import { useState } from "react";
import { signUpSchema } from "@lib/schemas";

export default function SignUpForm() {
  const [formFields, setFormFields] = useState([
    {
      label: "First name",
      name: "firstName",
      type: "text",
      placeholder: "Brad",
      error: "",
    },
    {
      label: "Last name",
      name: "lastName",
      type: "text",
      placeholder: "Meyn",
      error: "",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      error: "",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      error: "",
    },
  ]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // client action for validating form data & submitting to server
  const submitAction = async (formData: FormData) => {
    const newUser = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validationResult = signUpSchema.safeParse(newUser);

    if (validationResult.success === false) {
      const errors = validationResult.error.flatten().fieldErrors;
      // Update formFields with error messages
      const updatedFormFields = formFields.map((field) => ({
        ...field,
        error: errors[field.name] ? errors[field.name].join(", ") : "",
      }));
      setFormFields(updatedFormFields);
      return;
    }

    await registerUser(newUser);
  };

  const [errorMessage, dispatch] = useFormState(registerUser, undefined);
  const { pending } = useFormStatus();
  return (
    // @ts-expect-error
    <form action={submitAction}>
      <div className="mb-8 grid gap-4">
        {formFields.map((field) => {
          const isNameField =
            field.name === "firstName" || field.name === "lastName";
          return (
            <div
              key={"register-" + field.name}
              className={`col-span-2 ${isNameField ? "md:col-span-1" : ""}`}
            >
              <FormField {...field} />
            </div>
          );
        })}
      </div>

      {errorMessage ? (
        <FormErrorMessage errorMessage={errorMessage as string} />
      ) : null}
      <SubmitButton pending={pending} label={"Sign Up"} />
    </form>
  );
}
