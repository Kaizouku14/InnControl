import { getAllDirtyRooms } from "@/lib/api/app/tasks/query";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { markRoomAsAvailable } from "@/lib/api/app/tasks/mutation";

export const taskRouter = createTRPCRouter({
  getAllDirtyRooms: publicProcedure.query(async () => {
    return await getAllDirtyRooms();
  }),
  markUsDone: publicProcedure
    .input(
      z.object({
        room_id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
       return await markRoomAsAvailable(input.room_id);
    }),
});

export type Task = typeof taskRouter;
