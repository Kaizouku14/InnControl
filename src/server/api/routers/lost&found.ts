import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { issueLostItem } from "@/lib/api/app/lost&found/mutation";

export const lostAndFoundRouter = createTRPCRouter({
  issueLostItem: publicProcedure
    .input(
      z.object({
        item_lost: z.string().min(1),
        item_color: z.string().min(1),
        issued_date: z.date(),
        room_no: z.string().min(1),
        item_img : z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
        return await issueLostItem(input);
    }),
});

export type lostAndFound = typeof lostAndFoundRouter;
