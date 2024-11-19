import { db, eq } from "@/server/db";
import { guests } from "@/server/db/schema/guest";
import { rooms } from "@/server/db/schema/room";
import { transaction } from "@/server/db/schema/transaction";

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
      check_in: new Date(check_in),
      check_out: new Date(check_out),
      payment_date: new Date(payment_date),
    })
  );
};

export const getVisitorDistribution = async () => {
  const transactions = await db.select().from(transaction);

  const monthCounts: Record<string, number> = {};
  transactions.forEach((transaction) => {
    const date = new Date(transaction.check_in);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
    });

    if (monthCounts[formattedDate]) {
      monthCounts[formattedDate] += 1;
    } else {
      monthCounts[formattedDate] = 1;
    }
  });

  const data = Object.entries(monthCounts).map(([formattedDate, count]) => ({
    formattedDate,
    count,
  }));

  return data;
};

export const getTotalRevenue = async () => {
  const transactions = await db.select().from(transaction);

  console.log(transactions);
};
