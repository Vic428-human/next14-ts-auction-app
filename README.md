

## 專案說明
> 目前業界應該都是14居多，應該還沒升級到16，所以先練習這塊
- nextjs 14版本
- [drizzle-kit](https://orm.drizzle.team/docs/drizzle-kit-studio) : 資料庫的視覺編輯器
- @t3-oss/env-nextjs : package simplifies environment variable management in Next.js by providing type-safe validation and runtime checks. (所以避開了直接使用 .env出現的失敗問題，原先是要透過 dotenv才能解決，有了這個，可以無需使用 dotenv 的引用這一環節)
- Auth.js : google第三方登入會用到。
> NextAuth 本身並不直接知道如何把使用者、帳號、session 等資料存取到你的資料庫，所以
> auth.ts 中會搭配 DrizzleAdapter 一起使用，因為選擇使用 Drizzle ORM 來管理資料庫 schema 與操作的關係。
- postgres extension
<image-card alt="postgres extension" src="https://github.com/Vic428-human/next14-ts-auction-app/blob/main/postgres-explorer.png" ></image-card>
```
auth.js 搭配 DrizzleAdapter 的目的就是：
讓 NextAuth 能透過 Drizzle ORM 存取和管理使用者相關的資料表。
避免你自己重寫繁瑣的資料存取邏輯。
確保 schema 與 NextAuth 的需求一致。
同時處理 Edge runtime 的限制，避免在不支援的環境中直接載入資料庫。
```

### 專案製作過程中主要技術棧
- Nextjs is a file base router
- Dizzle ORM for easy read and write to database, doing nicer convension than sql
- [Shadcn](https://ui.shadcn.com/docs/rtl/next) => /lib 、 components.json 
- [Auth.js](https://authjs.dev/getting-started/installation?framework=Next.js)
> 純 React SPA 做 Google 登入首選 managed service 如 Auth0（安全、省 code），Next.js 則優先 Auth.js（server-side 整合順手）。兩者 OAuth flow 核心都依賴 後端/server runtime 處理敏感邏輯。

```
為什麼這樣選？
React SPA (Vite + React) : 首選 Auth0
Next.js: 首選 Auth.js
```

### 專案製作過程中主要知識點


#### npm run db:push 
> take all the schema changes and applying the the database

#### revalidatePath
> Revalidation in Next.js is the process of purging the Data Cache and re-fetching the latest data. This ensures that your application displays the most up-to-date information.
```

```

#### npx drizzle-kit push
> lets you literally push your schema and subsequent schema changes directly to the database while omitting SQL files generation, 


#### npx drizzle-kit push --config=drizzle-dev.config.ts
>  you have multiple database stages or multiple databases or different databases on the same project:

```
📦 <project root>
 ├ 📂 drizzle
 ├ 📂 src
 ├ 📜 .env
 ├ 📜 drizzle-dev.config.ts
 ├ 📜 drizzle-prod.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json
```

```
// 本專案用的
npx drizzle-kit push --config=drizzle.config.ts
```