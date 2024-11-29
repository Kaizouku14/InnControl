import { db, eq } from "@/server/db";
import { Inventory } from "@/server/db/schema/inventory";


export const addItem = async ({ ...params }: {
    item_name: string;
    category: "linen" | "cleaning supplies";
    quantity: number;
    location: string;
}) => {
  
  const [itemFound] = await db
    .select()
    .from(Inventory)
    .where(eq(Inventory.item_name, params.item_name));
}