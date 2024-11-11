import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { guests } from "./guest";
import { rooms } from "./room";

export const transaction = pgTable("transaction", {
  transaction_id: serial("transaction_id").primaryKey(),
  guest_id: integer("guest_id")
    .notNull()
    .references(() => guests.guest_id),
  room_id: integer("room_id")
    .notNull()
    .references(() => rooms.room_id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  payment_method: text("payment_method", {
    enum: ["cash", "credit-card", "others"],
  }).notNull(),
  payment_amount: integer("payment_amount").notNull(),
  payment_date: timestamp("payment_date").notNull(),
  booking_type: text("booking_type", { enum: ["online", "walk-in"] }).notNull(),
  check_in: timestamp("check_in").notNull(),
  check_out: timestamp("check_out"),
  additional_services: jsonb("additional_services"),
  total_days: integer("total_days").notNull(),
});

export type TransactionTable = typeof transaction;
