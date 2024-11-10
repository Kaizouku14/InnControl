import { z } from "zod";
import { createTRPCRouter, publicProcedure , protectedProcedure } from "../trpc";
import { login, register } from "@/lib/api/auth/mutation";
import { lucia } from "@/lib/auth/lucia";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ input }) => {
      return await register(input);
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ input }) => {
      return await login(input);
    }),
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user) return await lucia.invalidateUserSessions(ctx.user?.id);
  }),
});

export type AuthRouter = typeof authRouter;
