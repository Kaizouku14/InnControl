import { db } from "@/server/db";
import { rooms } from "@/server/db/schema/room";
import { transaction } from "@/server/db/schema/transaction";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

const findTransactionOrThrow = async (transaction_id: number) => {
  const [transactionFound] = await db
    .select()
    .from(transaction)
    .where(eq(transaction.transaction_id, transaction_id));

  if (!transactionFound) {
    throw new TRPCError({
      message: "Transaction not found",
      code: "NOT_FOUND",
    });
  }

  return transactionFound;
};

const findRoomOrThrow = async (room_no: string) => {
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

  return roomFound;
};

export const processedTransaction = async ({
  transaction_id,
  room_no,
}: {
  transaction_id: number;
  room_no: string;
}) => {
  await findTransactionOrThrow(transaction_id);
  await findRoomOrThrow(room_no);

  await db
    .update(transaction)
    .set({ status : "processed"})
    .where(eq(transaction.transaction_id, transaction_id))
    .execute();

  await db
    .update(rooms)
    .set({ status: "dirty" })
    .where(eq(rooms.room_no, room_no))
    .execute();
};

export const canceledTransaction = async ({
  transaction_id,
  room_no,
}: {
  transaction_id: number;
  room_no: string;
}) => {
  await findTransactionOrThrow(transaction_id);
  await findRoomOrThrow(room_no);

  await db
    .update(transaction)
    .set({ status : "canceled"})
    .where(eq(transaction.transaction_id, transaction_id))
    .execute();

  await db
    .update(rooms)
    .set({ status: "available" })
    .where(eq(rooms.room_no, room_no))
    .execute();
};
