import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// TODO: change employee_id to "user_id" refers to the logged-in user handling the transaction.

export const transaction = pgTable("transaction", {
  transaction_id: serial("transaction_id").primaryKey(),
  guest_id: integer("guest_id").notNull(),
  room_id: integer("room_id").notNull(),
  employee_id: integer("employee_id").notNull(), 
  payment_method: text("payment_method").notNull(),
  payment_amount: integer("payment_amount").notNull(),
  payment_date: timestamp("payment_date").notNull(),
  booking_type: text("booking_type").notNull(),
  check_in: timestamp("check_in").notNull(),
  check_out: timestamp("check_out"),
  additional_services: jsonb("additional_services"),
  transaction_status: text("transaction_status").notNull(),
  total_days: integer("total_days").notNull(),
});

export type TransactionTable = typeof transaction;
