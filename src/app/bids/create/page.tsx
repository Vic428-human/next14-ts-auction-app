"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction } from "./actions";

export default async function CreatePage() { // sync Server Component
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
