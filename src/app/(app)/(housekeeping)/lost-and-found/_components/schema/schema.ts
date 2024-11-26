import { z } from "zod";

export const LostAndFoundSchema = z.object({
    item_lost : z.string().min(1, { message : "Item lost is required"}),
    item_color : z.string().min(1, { message : "Item color is required"}),
    item_image : z.string().optional(),
})

export type LostAndFound = typeof LostAndFoundSchema; 