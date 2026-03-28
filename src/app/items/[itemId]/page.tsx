import { Button } from "@/components/ui/button";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { pageTitleStyles } from "@/styles";
import { eq } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import { time } from "console";
import { timestamp } from "drizzle-orm/gel-core";
import { formatDistance, subDays } from "date-fns";

// 計算幾天前
function formateTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}

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

  // const bids = [
  //   {
  //     id: 1,
  //     amount: 100,
  //     userName: "John Doe",
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: 2,
  //     amount: 200,
  //     userName: "Jane Doe",
  //     timestamp: new Date(),
  //   },
  // ];
  const bids = [];

  const hasBids = bids.length > 0;
  return (
    <main className="space-y-8">
      <div className="flex gap-8">
        {/* left side */}
        <div className="flex flex-col gap-6">
          <h1 className={pageTitleStyles}>
            <span className="text-3xl font-bold">Auction for</span> {item.name}
          </h1>
          <div className="text-xl space-y-4">
            <div>
              Starting Price of{" "}
              <span className="font-bold">${item.startingPrice / 100}</span>
            </div>
            <div>
              Bid Interval <span className="font-bold">{item.bidInterval}</span>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="space-y-4 flex-1">
          <h2 className="text-2xl font-bold">Current Bids</h2>
          {hasBids ? (
            <ul className="space-y-4">
              {bids.map((bid) => (
                <li key={bid.id} className="bg-gray-100 rounded-xl p-8">
                  <div className="flex gap-4">
                    <div>
                      <span className="font-bold">${bid.amount}</span> by{" "}
                      <span className="font-bold">{bid.userName}</span>{" "}
                    </div>

                    <div className="">{formateTimestamp(bid.timestamp)}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12">
              <Image
                src="/package.svg"
                alt="package"
                width={200}
                height={200}
              />
              No bids yet
              <Button>Place a bid</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
