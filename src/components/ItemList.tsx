'use client';

import { ItemCard } from "@/app/item-card";
import { Item } from "@/db/schema";

export function ItemList({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-4 gap-8">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
