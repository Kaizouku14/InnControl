import { db, eq } from "@/server/db";
import { rooms } from "@/server/db/schema/room";
import { TRPCError } from "@trpc/server";

export const createRoom = async ({
  ...params
}: {
  room_no: string;
  type: string;
  rate: number;
  capacity: number;
  floor: string;
}) => {
  const [roomFound] = await db
    .select()
    .from(rooms)
    .where(eq(rooms.room_no, params.room_no));

  if (roomFound) {
    throw new TRPCError({
      message: "Room already exists",
      code: "CONFLICT",
    });
  }

  await db
    .insert(rooms)
    .values({
      ...params,
      type: params.type as
        | "SR Deluxe"
        | "SR Prime"
        | "SR Premier"
        | "ER 1 Bed Room"
        | "ER 2 Bed Room",
    })
    .execute();
};

export const deleteRoom = async (room_id: number) => {
  const [roomFound] = await db
    .select()
    .from(rooms)
    .where(eq(rooms.room_id, room_id));

  if (!roomFound) {
    throw new TRPCError({
      message: "Room not found",
      code: "NOT_FOUND",
    });
  }

  await db.delete(rooms).where(eq(rooms.room_id, room_id)).execute();
};
