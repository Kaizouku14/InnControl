import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { userRouter } from "./routers/users";
import { bookingRouter } from "./routers/booking";
import { roomRouter } from "./routers/room";
import { guestRouter } from "./routers/guest";
import { transactionRouter } from "./routers/transaction";
import { taskRouter } from "./routers/task";

export const appRouter = createTRPCRouter({
   auth : authRouter,
   user : userRouter,
   bookings : bookingRouter,
   rooms : roomRouter,
   guest : guestRouter,
   transaction : transactionRouter,
   task : taskRouter,
});

export type AppRouter = typeof appRouter