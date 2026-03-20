import Image from "next/image";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import { createItemAction } from "./actions";

export default async function CreatePage() {
  const allItems = await database.query.items?.findMany();
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Post an Item (/bids/create)</h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg mb-8"
        action={createItemAction}
      >
        <Input 
        required
        className="max-w-lg" name="name" placeholder="Name your item" />
        <Input
        required
          className="max-w-lg"
          name="startingPrice"
          type="number"
          placeholder="what you start your auction at"
        />
        <Button className="self-end" type="submit">
          Post item
        </Button>
      </form>
    </main>
  );
}
