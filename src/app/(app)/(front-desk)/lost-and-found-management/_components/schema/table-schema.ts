import { z } from "zod";

export const lostAndFoundSchema = z.object({
  lost_item_id : z.number(),
  item_lost: z.string(),
  item_color: z.string(),
  issued_date: z.string(),
  room_no : z.string(),
  item_img : z.string().optional(),
});

export type LostItem = z.infer<typeof lostAndFoundSchema>;
