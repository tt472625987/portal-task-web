"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  ActionState,
  formErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { taskPath } from "@/paths";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(191)
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(191, "Password must be at most 191 characters long"),
});

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData)
    );

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

    const validPassword = await verify(user.passwordHash, password);

    if (!validPassword) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);

    const _cookie = await cookies();
    _cookie.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    return formErrorToActionState(error, formData);
  }

  redirect(taskPath);
  // return toActionState("SUCCESS", "Sign In successful");
};
