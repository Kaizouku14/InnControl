import { z } from "zod";

export const InventoryFormSchema = z.object({
  item_name: z.string().min(1, { message: "Item name is required" }),
  category: z.enum(["linen", "cleaning supplies"]),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  location: z.string().min(1, { message: "Location is required" }),
});

export type InventoryForm = typeof InventoryFormSchema;
