import "server-only";
import { env } from "@/env";
import * as schema from "./schema";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

type PgClient = ReturnType<typeof postgres>;

const globalForDb = globalThis as typeof globalThis & {
  pg?: PgClient;
  database?: PostgresJsDatabase<typeof schema>;
};

export const pg =
  process.env.NODE_ENV === "production"
    ? postgres(env.DATABASE_URL)
    : globalForDb.pg ?? (globalForDb.pg = postgres(env.DATABASE_URL));

export const database =
  process.env.NODE_ENV === "production"
    ? drizzle(pg, { schema })
    : globalForDb.database ?? (globalForDb.database = drizzle(pg, { schema }));
