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

  const availableRooms = roomsFound
    .filter((room) => room.status === "available")
    .map((room) => room.room_no);

  return availableRooms;
};

export const getAllRoomStatus = async () => {
  const roomStatus = await db.select({ status: rooms.status }).from(rooms);

  const statusCounts = roomStatus.reduce(
    (counts, room) => {
      counts[room.status!] = (counts[room.status!] || 0) + 1;
      return counts;
    },
    { available: 0, occupied: 0, dirty: 0 }
  );

  return {
    availableRooms: statusCounts.available,
    occupiedRooms: statusCounts.occupied,
    dirtyRooms: statusCounts.dirty,
  };
};
