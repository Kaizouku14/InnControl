import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { userRouter } from "./routers/users";
import { bookingRouter } from "./routers/booking";
import { roomRouter } from "./routers/room";

export const appRouter = createTRPCRouter({
   auth : authRouter,
   user : userRouter,
   bookings : bookingRouter,
   rooms : roomRouter,
});

export type AppRouter = typeof appRouter