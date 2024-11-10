import { pgTable, timestamp, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("fist_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role", { enum: ["housekeeping", "frontdesk", "admin"] }),
  address: text("address"),
  contact_no: text("contact_no"),
  department: text("department", { enum: ["housekeeping", "frontdesk"] })
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type UserTable = typeof users;
export type SessionTable = typeof sessions;
