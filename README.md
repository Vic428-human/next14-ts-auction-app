### 專案說明
> 製作此專案的目的主要是想學習Nextjs，以及了解怎麼製作競拍功能，等這個專案完成的差不多後，就會把核心功能移植過去 [交易所版本2](https://github.com/Vic428-human/marketplace-withoutClerk) 專案去使用。

#### 專案製作過程中主要技術棧
- nextjs 14 => a file base router
- [Shadcn](https://ui.shadcn.com/docs/rtl/next) => /lib 、 components.json ，快速搭建UI組件
- [drizzle-kit](https://orm.drizzle.team/docs/drizzle-kit-studio) : 資料庫的視覺編輯器
- @t3-oss/env-nextjs : package simplifies environment variable management in Next.js by providing type-safe validation and runtime checks. (所以避開了直接使用 .env出現的失敗問題，原先是要透過 dotenv才能解決，有了這個，可以無需使用 dotenv 的引用這一環節)
- Auth.js : google第三方登入會用到，另外React用的是 Auth0。
> NextAuth 本身並不直接知道如何把使用者、帳號、session 等資料存取到你的資料庫，所以
> auth.ts 中會搭配 DrizzleAdapter 一起使用，因為選擇使用 Drizzle ORM 來管理資料庫 schema 與操作的關係。
```
auth.js 搭配 DrizzleAdapter 的目的就是：
讓 NextAuth 能透過 Drizzle ORM 存取和管理使用者相關的資料表。
避免你自己重寫繁瑣的資料存取邏輯。
確保 schema 與 NextAuth 的需求一致。
同時處理 Edge runtime 的限制，避免在不支援的環境中直接載入資料庫。
```
- postgres extension: 直接在IDE進行PG操作
![postgres extension](https://github.com/Vic428-human/next14-ts-auction-app/blob/main/postgres-explorer.png)

---

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