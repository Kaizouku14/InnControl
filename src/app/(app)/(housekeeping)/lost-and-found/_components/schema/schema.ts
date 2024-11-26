import { z } from "zod";

export const LostAndFoundSchema = z.object({
    item_lost : z.string().min(1, { message : "Item lost is required"}),
    item_color : z.string().min(1, { message : "Item color is required"}),
    issued_date : z.date(),
})

export type LostAndFound = typeof LostAndFoundSchema; 