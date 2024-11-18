import { z } from "zod";

export const transactionSchema = z.object({
   
});

export type Transaction = z.infer<typeof transactionSchema>;
