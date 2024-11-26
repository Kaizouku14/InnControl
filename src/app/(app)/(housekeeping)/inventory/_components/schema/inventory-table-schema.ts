import { z } from "zod";

export const InventoryTableSchema = z.object({
  item_id: z.number(),
  item_name: z.string(),
  category: z.enum(["linen", "cleaning supplies"]),
  quantity: z.number(),
  location: z.string(),
});

export type Inventory = typeof InventoryTableSchema;
