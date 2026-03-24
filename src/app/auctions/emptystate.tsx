import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function EmptyState() {
  return (
    <div>
      <Image src="/package.svg" alt="package" width={200} height={200} />
      <p>you have no auctions yet</p>
      {/* asChild 會讓 Button 元件把自己渲染成 子元素的型態 */}
      {/* 在這裡，Button 不會輸出 <button>，而是把樣式和互動行為套用到 Link，最後渲染出 <a> */}
      <Button asChild>
        <Link href="/bids/create">Create an auction</Link>
      </Button>
    </div>
  );
}
