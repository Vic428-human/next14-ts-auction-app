"use client";
import Image from "next/image";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction } from "./actions";

// A component was suspended by an uncached promise，所以這邊不要用 async (不可建立 Promise)
// 因為 "use client" 宣告的時候，Client Component render 階段建立 Promise ，會違反規則。
export default function CreatePage() {
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Post an Item (/bids/create)</h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg mb-8"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);

          await createItemAction(formData);
        }}
      >
        <Input
          required
          className="max-w-lg"
          name="name"
          placeholder="Name your item"
        />
        <Input
          required
          className="max-w-lg"
          name="startingPrice"
          type="number"
          step="0.01"
          placeholder="what you start your auction at"
        />
        <Button className="self-end" type="submit">
          Post item
        </Button>
      </form>
    </main>
  );
}
