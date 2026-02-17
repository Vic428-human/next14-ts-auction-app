import Image from "next/image";
// we're going to import database we have (from  db/database.ts)
import { database } from "@/db/database";
import { bids as bidsSchema } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/signout-button";
import { auth } from "@/auth";

export default async function Home() {

  // fetch all the bids from the database for first render page
  const bids = await database.query.bids.findMany();

  const session = await auth()
  return (
    <main className="container mx-auto py-12">
      {/* 應用程式 > cookkie 登入後看得到 token */}
      {session ? <SignOut /> : <SignIn />}


      <form action={async (formData: FormData) => {
        'use server';
        // this is the drizzle library tool we can use
        // import bids that schema we have ex: src/db/schema.ts
        await database.insert(bidsSchema).values({});
        revalidatePath('/');
      }}>
        {/* connect to the database using drizzle */}
        <Input name="bid" placeholder="Bid" />
        <Button type="submit">place bit</Button>
      </form>

      {/* show all the bids */}
      {bids.map((bid) => (
        <div key={bid.id}>
          <p>{bid.id}</p>
        </div>
      ))}
    </main>
  );
}
