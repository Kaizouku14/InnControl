import { guests } from "@/server/db/schema/guest";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "@/server/db";

export const guestRouter = createTRPCRouter({
   getAllGuest : publicProcedure.query(async () => {
     return await db.select().from(guests);
  }),
})

export type GuestRouter = typeof guestRouter;


