import { ITransaction } from "@/interface/transaction"
import { db, eq } from "@/server/db";
import { guests } from "@/server/db/schema/guest";
import { rooms } from "@/server/db/schema/room";
import { transaction } from "@/server/db/schema/transaction";
import { TRPCError } from "@trpc/server";

export const registerBooking = async (data: ITransaction, user_id: string) => {
  const {
    room_no,
    check_in,
    check_out,
    no_of_nights,
    additional_services,
    booking_type,
    payment_method,
    payment_amount,
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

  const guest_id = insertedGuest.guest_id;

  await db.insert(transaction).values({
    guest_id: guest_id,
    room_id: roomFound.room_id,
    userId: user_id,
    payment_method: payment_method,
    payment_amount: payment_amount,
    payment_date: new Date(),
    booking_type: booking_type,
    check_in: check_in.toISOString(),
    check_out: check_out.toISOString(),
    additional_services: additional_services,
    no_of_nights: no_of_nights,
  });
};
