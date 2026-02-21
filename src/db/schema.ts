// this is where you can find your table and database
// we need to use drizzle to look what kind of database's properties on this table

import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
} from "drizzle-orm/pg-core"; // https://authjs.dev/getting-started/adapters/drizzle
import type { AdapterAccountType } from "@auth/core/adapters";

// 如果未來有改db的名稱 => npm run db:push
// 核心目的是「讓 Auth.js 把使用者／Session 等資料存到你的資料庫
export const users = pgTable("bb_user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

// Auth.js：開源 library，你自己 host、一切跑在你的 app（或 edge）環境裡，資料庫你自己決定（例如你現在用 Drizzle + Postgres）。

// Clerk：商業服務，帳號、session 等核心資料預設存放在 Clerk 的基礎設施，由它提供 API / SDK 給你呼叫。
// Clerk 不能直接把 Google 登入資料存進你的 Postgres。Clerk 的核心資料（包括 Google OAuth 的 user profile、token、session）都存在 Clerk 自己的雲端資料庫，
// 你只能透過 webhook 或 API 同步一份到你的 Postgres。
export const accounts = pgTable(
  "bb_account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
);

export const sessions = pgTable("bb_session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "bb_verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ],
);

// define the table's columns type
// for storing some information
export const bids = pgTable("bb_bids", {
  id: serial("id").primaryKey(),
});
