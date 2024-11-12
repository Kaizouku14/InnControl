import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { userRouter } from "./routers/users";
import { managementRouter } from "./routers/home";

export const appRouter = createTRPCRouter({
   auth : authRouter,
   user : userRouter,
   app : managementRouter,
});

export type AppRouter = typeof appRouter