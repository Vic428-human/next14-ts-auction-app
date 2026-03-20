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

export default async function Home() {

  // 查詢 pgTable 中的資料
  const allItems = await database.query.items?.findMany();

  const session = await auth()

  if (!session) return null;
  const user = session.user
  if (!user) return null;

  return (
    <main className="container mx-auto py-12">
      <h2 className="text-2xl font-bold mb-8">Items for Sale</h2>
      <div className="grid grid-cols-4 gap-8">
        {allItems?.map((item) => (
          <div key={item.id} className="border p-8 rounded-xl">
            <p>{item.name}</p>
          </div>
        ))}
      </div>

    </main>
  );
}
