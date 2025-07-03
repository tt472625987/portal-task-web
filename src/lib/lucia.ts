import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Prisma } from "./prisma";
import { Lucia } from "lucia";

const adapter = new PrismaAdapter(Prisma.session, Prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },

  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
  interface DatabaseUserAttributes {
    username: string;
    email: string;
  }
}
