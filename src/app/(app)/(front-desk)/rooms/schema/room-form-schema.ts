import { z } from "zod";

export const createRoomSchema = z.object({
  room_no: z.string().min(1, { message : 'Room no. is required.'}),
  type: z.enum([
    "SR Deluxe",
    "SR Prime",
    "SR Premier",
    "ER 1 Bed Room",
    "ER 2 Bed Room",
  ]),
  floor: z.string().min(1, { message : 'Room floor is required.'}),
});

export type CreateRoomSchema = typeof createRoomSchema;
