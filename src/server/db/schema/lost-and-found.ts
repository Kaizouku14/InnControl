import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { rooms } from "./room";

export const lostAndFound = pgTable("lost_and_found", {
  lost_item_id: serial("lost_item_id").primaryKey(),
  room_id: integer("room_id")
    .references(() => rooms.room_id)
    .notNull(),
  item_lost: text("item_lost").notNull(),
  item_color: text("item_color").notNull(),
  item_img: text("item_image"),
  issued_date : timestamp('issued_date').notNull(),
  status: text("status", { enum: ["stored", "returned", "disposed"] }).default(
    "stored"
  ),
});

export type lostAndFoundTable = typeof lostAndFound;
