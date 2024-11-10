import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { userRouter } from "./routers/users";

export const appRouter = createTRPCRouter({
   auth : authRouter,
   user : userRouter,
});

export type AppRouter = typeof appRouter