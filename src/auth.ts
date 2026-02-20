import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { database } from "@/db/database";
import { accounts, users, sessions, verificationTokens } from "@/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // 需要使用 schema => https://authjs.dev/getting-started/adapters/drizzle
  adapter: DrizzleAdapter(database, {
    accountsTable: accounts,
    usersTable: users,
    sessionsTable: sessions, // The sessionsTable is optional and only required if you’re using the database session strategy.
    verificationTokensTable: verificationTokens, // The verificationTokensTable is optional and only required if you’re using a Magic Link provider.
  }), // If you want to use your own tables, you can pass them as a second argument to DrizzleAdapter.
  providers: [Google],
});
