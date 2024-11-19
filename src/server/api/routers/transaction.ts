import {
  getAllTransaction,
  getTotalRevenue,
  getVisitorDistribution,
} from "@/lib/api/app/transaction/query";
import { createTRPCRouter, publicProcedure } from "../trpc";

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
});

export type Transaction = typeof transactionRouter;
