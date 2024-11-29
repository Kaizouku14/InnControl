import { db, eq } from "@/server/db";
import { rooms } from "@/server/db/schema/room";
import { TRPCError } from "@trpc/server";

export const markRoomAsAvailable = async (room_id: number) => {
  const [roomFound] = await db
    .select()
    .from(rooms)
    .where(eq(rooms.room_id, room_id));

    if(!roomFound){
        throw new TRPCError({
            message: "Room not found",
            code: "NOT_FOUND"
        });
    }

   await db 
     .update(rooms)
     .set({ status: "available" })
     .where(eq(rooms.room_id, room_id))
     .execute(); 
};
