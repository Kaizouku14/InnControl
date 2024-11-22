import {
  getAllIncomingCheckouts,
  getAllTransaction,
  getMostFeaturedRooms,
  getTotalRevenue,
  getVisitorDistribution,
} from "@/lib/api/app/transaction/query";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { transaction } from "@/server/db/schema/transaction";
import { z } from "zod";
import { processedTransaction } from "@/lib/api/app/transaction/mutation";

export const transactionRouter = createTRPCRouter({
  getAllTransaction: publicProcedure.query(async () => {
    return await getAllTransaction();
  }),
  getVisitorDistribution: publicProcedure.query(async () => {
    return await getVisitorDistribution();
  }),
  getTotalRevenue: publicProcedure.query(async () => {
    return await getTotalRevenue();
  }),
  getIncomingCheckouts: publicProcedure.query(async () => {
    return await getAllIncomingCheckouts();
  }),
  getMostFeaturedRooms : publicProcedure.query(async () => {
    return await getMostFeaturedRooms();
  }),

  processedTransaction: publicProcedure
    .input(
      z.object({
        transaction_id: z.number(),
        room_no: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await processedTransaction({ ...input });
    }),
  canceledTransaction: publicProcedure
    .input(
      z.object({
        transaction_id: z.number(),
        room_no: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {}),
});

export type Transaction = typeof transactionRouter;
