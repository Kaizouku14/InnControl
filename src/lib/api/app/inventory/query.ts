import { db } from "@/server/db";
import { Inventory } from "@/server/db/schema/inventory";

export const getAllItems = async () => {
  const items = await db.select().from(Inventory);

  return items;
};
