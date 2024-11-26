import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const Inventory = pgTable("inventory",{
    item_id : serial('room_id').primaryKey(),
    item_name : text('item_name').notNull(),
    category : text('category',{ enum : ['linen', 'cleaning supplies']}).notNull(),
    quantity : integer('quantity').notNull(),
    location : text('location').notNull(),
});

export const InventoryTable = typeof Inventory;