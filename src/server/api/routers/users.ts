import { userData } from "@/lib/api/user/query";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
   getUser : protectedProcedure.query(async ({ctx}) => {
       return await userData(ctx.user?.id);
   }),
})

export type UserRouter = typeof userRouter;


