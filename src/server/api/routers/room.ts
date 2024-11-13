import { db } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { rooms } from "@/server/db/schema/room";
import { z } from "zod";
import { deleteRoom } from "@/lib/api/app/room/mutations";

export const roomRouter = createTRPCRouter({
  getAllRooms: publicProcedure.query(async () => {
    return await db.select().from(rooms);
  }),
  deleteRoom: publicProcedure
    .input(
      z.object({
        room_id: z.number(),
      })
    )
    .mutation(({ input }) => {
        return deleteRoom(input.room_id);
    }),
});

export type RoomRouter = typeof roomRouter;
