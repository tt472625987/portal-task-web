"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { lucia } from "@/lib/lucia";
import { signInPath } from "@/paths";

import { getAuth } from "../queries/get-auth";

const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath);
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = await lucia.createBlankSessionCookie();

  const _cookie = await cookies();
  _cookie.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect(signInPath);
};

export { signOut };
