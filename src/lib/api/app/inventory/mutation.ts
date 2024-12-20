import { db, eq } from "@/server/db";
import { Inventory } from "@/server/db/schema/inventory";

export const addItem = async ({
  ...params
}: {
  item_name: string;
  category: "linen" | "cleaning supplies";
  quantity: number;
  location: string;
  userId: string
}) => {
  
  const [itemFound] = await db
    .select()
    .from(Inventory)
    .where(eq(Inventory.item_name, params.item_name.toLowerCase()));

  if (itemFound) {
    await db
      .update(Inventory)
      .set({ quantity: itemFound.quantity + params.quantity })
      .execute();
  }

  await db.insert(Inventory).values(params);
};


