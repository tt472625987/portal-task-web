"use client";
import { Input } from "@/components/ui/input";
import { signIn } from "../actions/sign-in";
import { SubmitButton } from "@/components/form/submit-button";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);

  return (
    <Form
      className="flex flex-col gap-y-4"
      action={action}
      actionState={actionState}
    >
      <Input
        name="email"
        placeholder="Email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError name="email" actionState={actionState} />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError name="password" actionState={actionState} />
      <SubmitButton label="Sign In" />
    </Form>
  );
};

export { SignInForm };
