import { integer, pgTable, serial, text,  } from "drizzle-orm/pg-core";
import { rooms } from "./room";

export const lostAndFound = pgTable("lost_and_found", {
  lost_item_id: serial("lost_item_id").primaryKey(),
  room_id: integer("room_id")
    .references(() => rooms.room_id)
    .notNull(),
  item_lost : text("item_lost").notNull(),
  item_color : text('item_color').notNull(),
  item_img : text('item_image'),
  status: text("status", { enum: ["stored", "returned", "disposed"] }),
});

export type lostAndFoundTable = typeof lostAndFound;
