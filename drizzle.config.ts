// drizzle.config.ts
// specify where your migration script lives
import { env } from "@/env";
import { defineConfig } from "drizzle-kit";


// https://orm.drizzle.team/docs/drizzle-kit-push
export default defineConfig({ 
  schema: "./src/db/schema.ts",
   dialect: "postgresql",
//   Mostly all drivers of the same dialect share the same set of connection params, as for exceptions like aws-data-api, pglight and d1-http - you will have to explicitly specify driver param.
//   driver:"pg",
   out: "./drizzle",
   dbCredentials: {
    url: env.DATABASE_URL,
  },
  // print all SQL statements prior to execution
  verbose: true,
  // always ask for approval before executing SQL statements
  strict: true
});
