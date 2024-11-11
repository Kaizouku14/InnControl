import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";

export const rooms = pgTable("rooms", {
  room_id: serial("room_id").primaryKey(),
  room_no: text("room_no").notNull(),
  type: text("room_type").notNull(),
  rate: integer("room_rate").notNull(),
  status: text("status", { enum: ["occupied", "available", "dirty"] }).notNull().unique(),
  capacity: integer("capacity").notNull(),
  floor: integer("floor").notNull(),
});

export type roomsTable = typeof rooms;