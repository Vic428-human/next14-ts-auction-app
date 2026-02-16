import Image from "next/image";
// we're going to import database we have (from  db/database.ts)
import { database } from "@/db/database";

import { bids as bidsSchema } from "@/db/schema";


export default async function Home() {

  // fetch all the bids from the database for first render page
  const bids = await database.query.bids.findMany();


  return (
    <main className="container mx-auto py-12">
      <form action={async (formData: FormData) => {
        'use server';
        // this is the drizzle library tool we can use
        // import bids that schema we have ex: src/db/schema.ts
        await database.insert(bidsSchema).values({});
      }}>
        {/* connect to the database using drizzle */}
        <input name="bid" placeholder="Bid" />
        <button type="submit">place bit</button>
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
