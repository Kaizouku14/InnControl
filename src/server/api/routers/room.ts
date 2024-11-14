import { db } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { rooms } from "@/server/db/schema/room";
import { z } from "zod";
import { createRoom, deleteRoom } from "@/lib/api/app/room/mutations";
import { getRoomNo } from "@/lib/api/app/room/query";

export const roomRouter = createTRPCRouter({
  createRoom: publicProcedure.input(z.object({
    room_no: z.string().min(1),
    type: z.string().min(1),
    rate: z.number(),
    capacity : z.number(),
    floor: z.string().min(1),
  })).mutation(({ input }) => {
    console.log(typeof input.floor);
     return createRoom(input);
  }),

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

  getRoomNo: publicProcedure
    .input(
      z.object({
        room_type: z.enum([
          "SR Deluxe",
          "SR Prime",
          "SR Premier",
          "ER 1 Bed Room",
          "ER 2 Bed Room",
        ]),
      })
    )
    .query(({ input }) => {
      console.log(input.room_type);
      return getRoomNo(input.room_type);
    }),
});

export type RoomRouter = typeof roomRouter;
