import { getAllDirtyRooms } from "@/lib/api/app/tasks/query";
import { createTRPCRouter, publicProcedure } from "../trpc"


export const taskRouter = createTRPCRouter({
    getAllDirtyRooms: publicProcedure.query(async () => {
        return await getAllDirtyRooms();
    }),
})


export type Task = typeof taskRouter;