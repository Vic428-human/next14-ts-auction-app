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
import { ItemCard } from "./item-card";
import { ItemList } from "@/components/ItemList";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

type AuthGateProps = {
  session: Session | null;
  children: React.ReactNode;
};

function AuthGate({ session, children }: AuthGateProps) {
  if (!session?.user) {
    return <></>;
  }
  return children;
}

export default async function Home() {
  // async => server Component

  // 查詢 pgTable 中的資料
  const allItems = await database.query.items?.findMany();

  const session = await auth();

  return (
    <AuthGate session={session}>
      <main className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-8">Items for Sale</h2>
        <ItemList items={allItems} />
      </main>
    </AuthGate>
  );
}
