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
      <form action={async (formData: FormData) => {
        'use server';

        const name = formData.get('name');
        if (typeof name !== 'string' || !user?.id) {
          throw new Error('輸入錯誤');
        }
        
        await database.insert(items).values({
          name,
          userId: user.id,
        });
        revalidatePath('/');
      }}>
        {/* connect to the database using drizzle */}
        <Input name="name" placeholder="Name your item" />
        <Button type="submit">Post item</Button>
      </form>

      {/* show all the bids */}
      {allItems?.map((item) => (
        <div key={item.id}>
          <p>{item.id}</p>
        </div>
      ))}
    </main>
  );
}
