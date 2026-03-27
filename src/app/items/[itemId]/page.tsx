import { Button } from "@/components/ui/button";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { pageTitleStyles } from "@/styles";
import { eq } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";

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
    return (
      <div className="space-y-8 flex flex-col items-center mt-12">
        <Image src="/package.svg" alt="package" width={200} height={200} />
        <h1 className={pageTitleStyles}>Item not found</h1>
        <p className="text-center">
          The item you&apos;re trying to view is invalid.
          <br /> Pleace goback and search for a diffferent auction item.
        </p>
        <Button asChild>
          <Link href={`/`}>View Auction</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>
        <span className="font-normal">Auction for</span> {item.name}
      </h1>
      <div>Starting Price of ${item.startingPrice / 100}</div>
    </main>
  );
}
