import { db, eq } from "@/server/db";
import { lostAndFound } from "@/server/db/schema/lost-and-found";
import { rooms } from "@/server/db/schema/room";

export const getAllLostItems = async () => {
  const items = await db
    .select({
      lost_item_id : lostAndFound.lost_item_id,
      item_lost: lostAndFound.item_lost,
      item_color: lostAndFound.item_color,
      issued_date: lostAndFound.issued_date,
      status: lostAndFound.status,
      item_img : lostAndFound.item_img,
      room_no: rooms.room_no
    })
    .from(lostAndFound)
    .innerJoin(rooms, eq(rooms.room_id, lostAndFound.room_id));


  return items;
};
