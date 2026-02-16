import Image from "next/image";
// we're going to import database we have (from  db/database.ts)
import { database } from "@/db/database";

import { bids } from "@/db/schema";


export default function Home() {
  return (
    <main>
      <form action={async (formData: FormData) => {
        'use server';
        // this is the drizzle library tool we can use
        // import bids that schema we have ex: src/db/schema.ts
        await database.insert(bids).values({});
      }}>
        {/* connect to the database using drizzle */}
        <input name="bid" placeholder="Bid" />
        <button type="submit">place bit</button>
      </form>
    </main>
  );
}
