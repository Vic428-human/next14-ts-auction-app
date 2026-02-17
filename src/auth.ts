import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// 在於它 import 了 database，只要它被 **proxy/middleware（Edge runtime）
// **那條路徑載入，就會把 database.ts 一起載入 → 
// 你就會遇到 global is not defined（或改成 globalThis 
// 後遇到 Edge 不支援某些 Node 套件/資料庫連線）。
import { database } from "@/db/database";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(database),
  providers: [Google],
});
