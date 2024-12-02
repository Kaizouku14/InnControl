import {
  getUserDepartment,
  getUserInformation,
  getUsersData,
} from "@/lib/api/user/query";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { createUser, udpateUserInfo } from "@/lib/api/user/mutation";

export const userRouter = createTRPCRouter({
  getUserDepartment: protectedProcedure.query(async ({ ctx }) => {
    return await getUserDepartment(ctx.user?.id);
  }),

  getUserData: protectedProcedure.query(async () => {
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
        department: z.enum(["housekeeping", "frontdesk", "IT-support"]),
      })
    )
    .mutation(async ({ input }) => {
      return await createUser(input);
    }),

  getUserInformation: protectedProcedure.query(async ({ ctx }) => {
    return await getUserInformation(ctx.user?.id);
  }),

  updateUserInformation: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        address: z.string().min(1),
        contact_no: z.string().min(1),
        email: z.string().email(),
        password: z.string(),
        newPassword: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await udpateUserInfo({
        ...input,
        userId: ctx.user?.id,
      });
    }),
});

export type UserRouter = typeof userRouter;
