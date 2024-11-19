import { getTotalRevenue, getVisitorDistribution } from "@/lib/api/app/transaction/query";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const transactionRouter = createTRPCRouter({
    getVisitorDistribution: publicProcedure.query(async () => {
        return await getVisitorDistribution();
    }),
    getTotalRevenue: publicProcedure.query(async () => {
        return await getTotalRevenue();
    }),
});

export type Transaction = typeof transactionRouter;