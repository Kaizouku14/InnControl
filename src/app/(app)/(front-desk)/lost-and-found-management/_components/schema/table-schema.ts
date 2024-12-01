import { z } from "zod";

export const lostAndFoundSchema = z.object({
  lost_item_id : z.number(),
  item_lost: z.string(),
  item_color: z.string(),
  issued_date: z.date(),
  room_no : z.string(),
});

export type LostItem = z.infer<typeof lostAndFoundSchema>;