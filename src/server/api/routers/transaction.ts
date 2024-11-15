import { getTransaction } from "@/lib/api/app/transaction/query";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const transactionRouter = createTRPCRouter({
    getTransaction: publicProcedure.query(async () => {
        return await getTransaction();
    })
});

export type Transaction = typeof transactionRouter;