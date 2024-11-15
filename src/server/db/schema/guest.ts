import { pgTable, text, serial } from "drizzle-orm/pg-core";

export const guests = pgTable("guests", {
  guest_id: serial("guest_id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  address: text("address").notNull(),
  contact_no: text("contact_no").notNull(),
});

export type GuestTable = typeof guests;
