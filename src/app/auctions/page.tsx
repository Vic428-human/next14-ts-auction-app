import Image from "next/image";
// we're going to import database we have (from  db/database.ts)
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/signout-button";
import { auth } from "@/auth";

import { ItemList } from "@/components/ItemList";
import { eq } from "drizzle-orm";

export default async function MyAuctionPage() {
  // async => server Component
  const session = await auth();
  if (!session || !session.user) {
    return (
      <main className="container mx-auto py-12">
        <SignIn />
      </main>
    );
  }

  // 查詢 pgTable 中的資料
  const allItems = await database.query.items?.findMany({
    where: eq(items.userId, session.user.id!), // session.user.id! 會告訴 TypeScript：「我保證這個值不是 undefined」
  });

  return (
    <main className="container mx-auto py-12">
      <h2 className="text-2xl font-bold mb-8">my</h2>
      <div className="">
        {/* A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework. */}
        {/* 某個 Client Component 嘗試直接 await 一個 Promise */}
        {/* 當 Server Component 把 Promise 傳到 Client Component，React 會嘗試 suspend，但因為不是透過 Suspense-compatible library，就會報這個錯。 */}
        <ItemList items={allItems} />
      </div>
    </main>
  );
}
