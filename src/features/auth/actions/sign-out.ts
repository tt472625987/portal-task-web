"use server";
import { redirect } from "next/navigation";
import { getAuth } from "../queries/get-auth";
import { signInPath } from "@/paths";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";

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
