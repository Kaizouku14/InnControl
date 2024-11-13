import { z } from "zod"

export const roomSchema = z.object({
  room_id: z.number(),
  room_no: z.string(),
  type: z.enum(["SR Deluxe", "SR Prime", "SR Premier", "ER 1 Bed Room", "ER 2 Bed Room"]),
  rate: z.number(),
  status: z.enum(["occupied", "available", "dirty"] ),
  floor: z.number(),
  capacity: z.number(),
})

export type Room = z.infer<typeof roomSchema>
