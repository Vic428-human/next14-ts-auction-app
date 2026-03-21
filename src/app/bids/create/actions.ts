"use server";

import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createItemAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("請先登入");
  }
  const user = session.user;

  if (!user || !user.id) {
    throw new Error("請先登入");
  }


  // 在程式裡如果直接用 float 或 double 來存金額，會遇到小數點計算不精確的問題。
  // 例如 0.1 + 0.2 在 JavaScript 中不是精確的 0.3。這在金額計算上會造成麻煩。
  const startingPrice = formData.get("startingPrice") as string;

  // 乘以 100 就是把「元」轉換成「分」。例如 12.34 元 會存成 1234 (整數)。
  // 這樣在資料庫裡就能用 integer 來存，避免浮點數誤差。
  const pricesAsCents = Math.floor(parseFloat(startingPrice) * 100); // pricesAsCents = 1234，所以DB存的是分，之後顯示在前端再記得除以100
  await database.insert(items).values({
    name: formData.get("name") as string,
    startingPrice: pricesAsCents,
    userId: user.id,
  });
  redirect("/");
}
