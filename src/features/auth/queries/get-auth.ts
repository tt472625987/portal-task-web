import { cookies } from "next/headers";
import { cache } from "react";

import { lucia } from "@/lib/lucia";

export const getAuth = cache(async () => {
  const _cookie = await cookies();

  const sessionId = _cookie.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {
    // do nothing if used in a RSC
    console.error(error);
  }

  return result;
});
