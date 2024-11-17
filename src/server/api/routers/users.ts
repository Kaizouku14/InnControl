import { getUserDepartment, getUsersData } from "@/lib/api/user/query";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { createUser } from "@/lib/api/user/mutation";

export const userRouter = createTRPCRouter({
   getUserDepartment : protectedProcedure.query(async ({ctx}) => {
       return await getUserDepartment(ctx.user?.id);
   }),
   
   getUserData : protectedProcedure.query(async () => {
     return await getUsersData();
   }),

   createUser: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
        address: z.string().min(1),
        contact_no: z.string().min(1),
        department : z.enum(["housekeeping", "frontdesk", "IT-support"])
      })
    )
    .mutation(async ({ input }) => {
      return await createUser(input);
    }),
})

export type UserRouter = typeof userRouter;


