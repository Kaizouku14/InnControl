import { db, eq } from "@/server/db"
import { lostAndFound } from "@/server/db/schema/lost-and-found"
import { rooms } from "@/server/db/schema/room"

export const issueLostItem = async ({ ...params } : {
    item_lost: string,
    item_color : string,
    issued_date : Date,
    room_no : string,
    item_img? : string 
}) => {
 
 const [roomFound] =  await db
      .select({ room_id: rooms.room_id })
      .from(rooms)
      .where(eq(rooms.room_no, params.room_no));
    
  await db
      .insert(lostAndFound)
      .values({
        ...params,
        room_id: roomFound.room_id
      })
}