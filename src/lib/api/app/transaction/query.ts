import { db } from "@/server/db";
import { transaction } from "@/server/db/schema/transaction";
import { TRPCError } from "@trpc/server";

export const getTransaction = async () => {
  const transactions = await db.select().from(transaction);

  if (!transactions) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Transaction data not found",
    });
  }

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

  if (!transactions) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Transaction data not found",
    });
  }

  

}
