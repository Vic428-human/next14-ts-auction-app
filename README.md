

## 專案說明
> 目前業界應該都是14居多，應該還沒升級到16，所以先練習這塊
- nextjs 14版本
- drizzle-kit : 資料庫的視覺編輯器
- @t3-oss/env-nextjs : package simplifies environment variable management in Next.js by providing type-safe validation and runtime checks. (所以避開了直接使用 .env出現的失敗問題，原先是要透過 dotenv才能解決，有了這個，可以無需使用 dotenv 的引用這一環節)
- Auth.js : 例如google第三方登入會用到

### 專案製作過程中主要技術棧
- Nextjs is a file base router
- Dizzle ORM for easy read and write to database, doing nicer convension than sql
- [Shadcn](https://ui.shadcn.com/docs/rtl/next) => /lib 、 components.json 
- [Auth.js](https://authjs.dev/getting-started/installation?framework=Next.js)

### 專案製作過程中主要知識點
- revalidatePath => Revalidation in Next.js is the process of purging the Data Cache and re-fetching the latest data. This ensures that your application displays the most up-to-date information.
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