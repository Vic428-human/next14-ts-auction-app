'use client'
import { Item } from "../db/schema";

export function ItemCard({ item }: { item: Item }) {
  return (
    <div key={item.id} className="border p-8 rounded-xl">
      {item.name}
      starting price: ${item.startingPrice / 100}
    </div>
  );
}
