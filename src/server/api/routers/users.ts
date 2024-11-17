import { userData } from "@/lib/api/user/query";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { register } from "@/lib/api/auth/mutation";
import { z } from "zod";

export const userRouter = createTRPCRouter({
   getUser : protectedProcedure.query(async ({ctx}) => {
       return await userData(ctx.user?.id);
   }),

   register: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
        address: z.string().min(1),
        contanct_no: z.string().min(1),
        department : z.enum(["housekeeping", "frontdesk", "IT-support"])
      })
    )
    .mutation(async ({ input }) => {
      return await register(input);
    }),
})

export type UserRouter = typeof userRouter;


