import {
  getAllTransaction,
  getTotalRevenue,
  getVisitorDistribution,
} from "@/lib/api/app/transaction/query";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { transaction } from "@/server/db/schema/transaction";
import { z } from "zod";
import { handleProcessedTransaction } from "@/lib/api/app/transaction/mutation";

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
  processedTransaction: publicProcedure
    .input(
      z.object({
        transaction_id: z.number(),
        room_no : z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await handleProcessedTransaction({ ...input });
    })
});

export type Transaction = typeof transactionRouter;
