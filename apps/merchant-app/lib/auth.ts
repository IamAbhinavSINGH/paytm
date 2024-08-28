import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";
import { AuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { Account } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }: {
      user: AdapterUser | { email?: string | null, name?: string | null },
      account: Account | null,
    }): Promise<boolean> {
      console.log("hi signin");

      // Check if user and account exist, and handle cases where they might be null
      if (!user || !user.email || !account) {
        return false;
      }

      // Determine provider type based on account.provider, falling back if needed
      const authType = account.provider === "google" ? "Google" : "Github";

      await db.merchant.upsert({
        select: {
          id: true,
        },
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name || "",
          auth_type: authType,
        },
        update: {
          name: user.name || "",
          auth_type: authType,
        },
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};