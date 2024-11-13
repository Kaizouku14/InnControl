import { db, eq } from "@/server/db";
import { rooms } from "@/server/db/schema/room";
import { TRPCError } from "@trpc/server";

export const getRoomNo = async (
  room_type:
    | "SR Deluxe"
    | "SR Prime"
    | "SR Premier"
    | "ER 1 Bed Room"
    | "ER 2 Bed Room"
) => {

  const roomsFound = await db
    .select()
    .from(rooms)
    .where(eq(rooms.type, room_type));

  if (!roomsFound) {
    throw new TRPCError({
      message: "No room found with this type.",
      code: "NOT_FOUND",
    });
  }

  return roomsFound.map((room) => room.room_no);
};
