import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { login, register } from "@/lib/api/auth/mutation";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        firstName : z.string().min(3),
        lastName : z.string().min(3),
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
});

export type AuthRouter = typeof authRouter;
