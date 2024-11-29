import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { addItem } from "@/lib/api/app/inventory/mutation";
import { getAllItems } from "@/lib/api/app/inventory/query";

export const InventoryRouter = createTRPCRouter({
  addItem: publicProcedure
     .input(
        z.object({
            item_name : z.string().min(1),
            category : z.enum(["linen", "cleaning supplies"]),
            quantity : z.number().min(1),
            location : z.string().min(1)
        })
     )
     .mutation(async ({ input }) => {
         return await addItem(input);
     }),
  getAllItems : publicProcedure.query(async () => {
      return await getAllItems();
  })  
    
});


export type Inventory = typeof InventoryRouter; 