import { z } from "zod";

export const transactionSchema = z.object({
  transaction_id: z.number(),
  guest_fullname: z.string(),
  room_no: z.string(),
  check_in: z.date(),
  check_out: z.date(),
  no_of_nights: z.number(),
  payment_amount: z.number(),
  payment_date: z.date(),
  payment_method: z.enum(["Cash", "Credit-card", "E-Cash"]),
  booking_type: z.enum(["Online", "Walk-in"]),
  additional_service: z.enum(["Breakfast"]).nullable(),
  outstanding_balance: z.number().nullable(),
  discount: z.enum(["pwd", "senior"]).nullable(),
  status: z.enum(["active", "canceled", "processed"]).default("active"),
});

export type Transaction = z.infer<typeof transactionSchema>;
