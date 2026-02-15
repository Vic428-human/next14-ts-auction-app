// https://env.t3.gg/docs/nextjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// 簡單來說如果沒有使用 @t3-oss/env-nextjs，取引用 .env 檔案的話，會出現下方問題，有使用 @t3-oss/env-nextjs 就不需要下方這個處理方式了。
// when integrating with Next.js 14, drizzle-kit push:pg seems unable to access the database URL stored within the .env file. 
// https://stackoverflow.com/questions/77593688/unable-to-load-env-database-url-in-drizzle-kits-drizzle-config-ts-with-next-js
// import dotenv from "dotenv";
// use dotenv to access your relevant .env files.
// dotenv.config({
//   path: ".env.local",
// });



export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    NODE_ENV: z.string().min(1),
  },
  client: {
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});
