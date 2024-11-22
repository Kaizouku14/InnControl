import { status } from "@/lib/helper/objects";
import { getPercentageChange } from "@/lib/utils";
import { db, eq } from "@/server/db";
import { guests } from "@/server/db/schema/guest";
import { rooms } from "@/server/db/schema/room";
import { transaction } from "@/server/db/schema/transaction";
import { format } from "date-fns";
import { check } from "drizzle-orm/pg-core";

export const getAllTransaction = async () => {
  const transactions = await db
    .select({
      transaction_id: transaction.transaction_id,
      first_name: guests.first_name,
      last_name: guests.last_name,
      room_no: rooms.room_no,
      check_in: transaction.check_in,
      check_out: transaction.check_out,
      no_of_nights: transaction.no_of_nights,
      payment_amount: transaction.payment_amount,
      payment_date: transaction.payment_date,
      payment_method: transaction.payment_method,
      booking_type: transaction.booking_type,
      additional_service: transaction.additional_services,
      outstanding_balance: transaction.outstanding_balance,
      discount: transaction.discount,
      status: transaction.status,
    })
    .from(transaction)
    .innerJoin(guests, eq(guests.guest_id, transaction.guest_id))
    .innerJoin(rooms, eq(rooms.room_id, transaction.room_id));

  return transactions.map(
    ({ first_name, last_name, check_in, check_out, payment_date, ...txn }) => ({
      ...txn,
      guest_fullname: `${first_name} ${last_name}`,
      check_in: format(new Date(check_in), "MM/dd/yyyy"),
      check_out: format(new Date(check_out), "MM/dd/yyyy"),
      payment_date: format(new Date(payment_date), "MM/dd/yyyy"),
    })
  );
};

export const getVisitorDistribution = async () => {
  const transactions = await db.select().from(transaction);

  const result = getPercentageChange(
    transactions,
    "check_in",
    "payment_amount"
  );

  return result;
};

export const getTotalRevenue = async () => {
  const transactions = await db
    .select({
      payment_date: transaction.payment_date,
      payment_amount: transaction.payment_amount,
    })
    .from(transaction);

  const result = getPercentageChange(
    transactions,
    "payment_date",
    "payment_amount"
  );

  return result;
};

export const getAllIncomingCheckouts = async () => {
  const transactions = await db
    .select({
      room_no: rooms.room_no,
      check_out: transaction.check_out,
      status: transaction.status,
    })
    .from(transaction)
    .innerJoin(rooms, eq(rooms.room_id, transaction.room_id));

  const currentTime = new Date();
  const fiveHoursFromNow = new Date(currentTime.getTime() + 5 * 60 * 60 * 1000); 

  return transactions.filter(({ check_out, status }) => {
    const givenTime = new Date(check_out);

    return (
      status === "active" &&
      givenTime >= currentTime &&
      givenTime <= fiveHoursFromNow
    );
  });
};
