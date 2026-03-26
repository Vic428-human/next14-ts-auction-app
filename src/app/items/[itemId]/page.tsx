import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  // await params，解開 Promise
  const { itemId } = await params;

  const id = Number(itemId);
  if (Number.isNaN(id)) {
    return <h1>Invalid item ID</h1>;
  }

  const item = await database.query.items.findFirst({
    where: eq(items.id, id),
  });

  if (!item) {
    return;
    <div>
      <h1 className="text-4xl font-bold">Item not found</h1>;
    </div>;
  }

  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-bold">{item.name}</h1>
    </main>
  );
}
