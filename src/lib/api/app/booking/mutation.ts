import { ITransaction } from "@/interface/transaction";
import { db, eq ,or } from "@/server/db";
import { guests } from "@/server/db/schema/guest";
import { rooms } from "@/server/db/schema/room";
import { transaction } from "@/server/db/schema/transaction";
import { TRPCError } from "@trpc/server";

export const registerBooking = async (data: ITransaction, user_id: string) => {

  const {
    room_no,
    check_in,
    check_out,
    last_name,
    first_name,
    email,
    contact_no,
    address,
  } = data;

  const [roomFound] = await db
    .select()
    .from(rooms)
    .where(eq(rooms.room_no, room_no));

  if (!roomFound) {
    throw new TRPCError({
      message: "Room not found",
      code: "NOT_FOUND",
    });
  }

  if (roomFound.status === "occupied") {
    throw new TRPCError({
      message: `Room ${room_no} is not available`,
      code: "FORBIDDEN",
    });
  }

  if (roomFound.status === "dirty") {
    throw new TRPCError({
      message: `Room ${room_no} is being cleaned`,
      code: "FORBIDDEN",
    });
  }

  const [existingGuest] = await db
    .select()
    .from(guests)
    .where(
      or(
        eq(guests.email, email), // Check by email
        eq(guests.contact_no, contact_no) // or check by contact number
      )
    );


  let guest_id: number;

  if (existingGuest) {
    guest_id = existingGuest.guest_id;
  } else {

    const [insertedGuest] = await db
      .insert(guests)
      .values({
        last_name,
        first_name,
        email,
        contact_no,
        address,
      })
      .returning({ guest_id: guests.guest_id });

    guest_id = insertedGuest.guest_id;
  }

  await db
    .insert(transaction)
    .values({
      ...data,
      guest_id: guest_id,
      room_id: roomFound.room_id,
      userId: user_id,
      payment_date: new Date(),
      check_in: check_in.toISOString(),
      check_out: check_out.toISOString(),
    })
    .execute();

  await db
    .update(rooms)
    .set({ status: "occupied" })
    .where(eq(rooms.room_id, roomFound.room_id))
    .execute();
};
