import { db } from "@/server/db";
import { rooms } from "@/server/db/schema/room";

export const getAllDirtyRooms = async () => {

  const dirtyRooms = await db
    .select({
      room_id: rooms.room_id,
      room_no: rooms.room_no,
      status: rooms.status,
      floor: rooms.floor,
    })
    .from(rooms);

  return dirtyRooms.filter(({ status }) => status === "dirty");
};
