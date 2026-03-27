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
import { redirect } from "next/navigation";
import { EmptyState } from "./emptystate";
import { pageTitleStyles } from "@/styles";

export default async function MyAuctionPage() {
  // async => server Component
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }

  // 查詢 pgTable 中的資料
  const allItems = await database.query.items?.findMany({
    where: eq(items.userId, session.user.id!), // session.user.id! 會告訴 TypeScript：「我保證這個值不是 undefined」
  });

  const hasItems = allItems.length > 0;

  return (
    <main className="py-12">
      <h2 className={pageTitleStyles}>Your current Auctions</h2>
      <div className="">
        {!hasItems ? <ItemList items={allItems} /> : <EmptyState />}
      </div>
    </main>
  );
}
