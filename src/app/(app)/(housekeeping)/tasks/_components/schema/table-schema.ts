import { z } from "zod";

export const taskSchema = z.object({
  room_id: z.number(),
  room_no: z.string(),
  floor: z.string(),
  status: z.enum(["dirty", "occupied", "available"]).nullable(),
});

export type Task = z.infer<typeof taskSchema>;
