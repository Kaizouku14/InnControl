import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { userRouter } from "./routers/users";
import { bookingRouter } from "./routers/booking";
import { roomRouter } from "./routers/room";
import { guestRouter } from "./routers/guest";

export const appRouter = createTRPCRouter({
   auth : authRouter,
   user : userRouter,
   bookings : bookingRouter,
   rooms : roomRouter,
   guest : guestRouter,
});

export type AppRouter = typeof appRouter