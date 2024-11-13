import { z } from "zod"

export const roomSchema = z.object({
  room_no: z.string(),
  type: z.string(),
  rate: z.number(),
  status: z.string(),
  floor: z.number(),
  capacity: z.number(),
})

export type Room = z.infer<typeof roomSchema>

//enum(["SR Deluxe", "SR Prime", "SR Premier", "ER 1 Bed Room", "ER 2 Bed Room"])
//enum(["occupied", "available", "dirty"] ),