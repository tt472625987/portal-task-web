"use server";

import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { z } from "zod";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long")
      .refine((value) => !value.includes(" "), {
        message: "Username cannot contain spaces",
      }),

    email: z
      .string()
      .min(1, "Email is required")
      .max(191)
      .email("Invalid email format"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(191, "Password must be at most 191 characters long"),

    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long")
      .max(191, "Confirm Password must be at most 191 characters long"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const signUp = async (_actionState: ActionState, data: FormData) => {
  try {
    const { username, email, password, confirmPassword } = signUpSchema.parse(
      Object.fromEntries(data)
    );
  } catch (error) {
    return formErrorToActionState(error, data);
  }
  return toActionState("SUCCESS", "Sign up successful");
};
