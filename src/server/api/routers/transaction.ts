import { getTotalRevenue, getTransaction } from "@/lib/api/app/transaction/query";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const transactionRouter = createTRPCRouter({
    getTransaction: publicProcedure.query(async () => {
        return await getTransaction();
    }),
    getTotalRevenue: publicProcedure.query(async () => {
        return await getTotalRevenue();
    }),
});

export type Transaction = typeof transactionRouter;