// drizzle.config.ts
// specify where your migration script lives
import { env } from "./env";
import { defineConfig } from "drizzle-kit";

// when integrating with Next.js 14, drizzle-kit push:pg seems unable to access the database URL stored within the .env file. 
// https://stackoverflow.com/questions/77593688/unable-to-load-env-database-url-in-drizzle-kits-drizzle-config-ts-with-next-js
// import dotenv from "dotenv";
// use dotenv to access your relevant .env files.
// dotenv.config({
//   path: ".env.local",
// });

// https://orm.drizzle.team/docs/drizzle-kit-push
export default defineConfig({ 
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
//   Mostly all drivers of the same dialect share the same set of connection params, as for exceptions like aws-data-api, pglight and d1-http - you will have to explicitly specify driver param.
//   driver:"pg",
  out: "./drizzle",
  dbCredentials: {
    // "postgresql://user:password@host:port/dbname",
    url: env.DATABASE_URL
  },
  // print all SQL statements prior to execution
  verbose: true,
  // always ask for approval before executing SQL statements
  strict: true
});
