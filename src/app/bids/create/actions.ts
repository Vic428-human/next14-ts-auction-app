"use server";

import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createItemAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("請先登入");
  }
  const user = session.user;

  if (!user || !user.id) {
    throw new Error("請先登入");
  }
  await database.insert(items).values({
    name: formData.get("name") as string,
    startingPrice: Number(formData.get("startingPrice")),
    userId: user.id,
  });
  revalidatePath("/");
}
