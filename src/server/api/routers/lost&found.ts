import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  issueLostItem,
  returnLostItem,
  disposeLostItem,
} from "@/lib/api/app/lost&found/mutation";
import { getAllLostItems } from "@/lib/api/app/lost&found/query";

export const lostAndFoundRouter = createTRPCRouter({
  issueLostItem: publicProcedure
    .input(
      z.object({
        item_lost: z.string().min(1),
        item_color: z.string().min(1),
        issued_date: z.date(),
        room_no: z.string().min(1),
        item_img: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await issueLostItem(input);
    }),
  getAllLostItems: publicProcedure.query(async () => {
    return await getAllLostItems();
  }),
  returnLostItem: publicProcedure
    .input(
      z.object({
        lost_item_id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await returnLostItem(input.lost_item_id);
    }),
  disposeLostItem: publicProcedure
    .input(
      z.object({
        lost_item_id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await disposeLostItem(input.lost_item_id);
    }),
});

export type lostAndFound = typeof lostAndFoundRouter;
