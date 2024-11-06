import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const authRouter = createTRPCRouter({
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
      console.log(input);
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ input }) => {
      console.log(input);
    }),
});

export type authRouter = typeof authRouter;
