import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { database } from "@/db/database";
import { accounts, users, sessions, verificationTokens } from "@/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // 需要使用 schema => https://authjs.dev/getting-started/adapters/drizzle
  // NextAuth 會用 DrizzleAdapter 把 session 儲存在你定義的 sessions 表中，並用 users 表關聯使用者。
  adapter: DrizzleAdapter(database, {
    accountsTable: accounts,
    usersTable: users, // Auth.js 預設的行為是，把 users 表裡的這些欄位，直接當成 session.user 的欄位來源。
    sessionsTable: sessions, // The sessionsTable is optional and only required if you’re using the database session strategy.
    verificationTokensTable: verificationTokens, // The verificationTokensTable is optional and only required if you’re using a Magic Link provider.
  }), // If you want to use your own tables, you can pass them as a second argument to DrizzleAdapter.
  providers: [Google],
  // 這邊原先會放callback，但因為沒有放，所以會把 bb_user 映射到 user
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) token.id = user.id;
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user.id = token.id;
  //     return session;
  //   },
  // },
});
