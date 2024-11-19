"use client"

import React from "react";

import { Card, CardContent,} from "@/components/ui/card";
import { api } from "@/app/_trpc/client";

const RoomCard = () => {
   const { data } = api.rooms.getAllRoomStatus.useQuery();

  return (
    <div className="flex gap-2">
      <Card className="text-center h-24">
        <CardContent className="flex flex-col items-center justify-center gap-1.5  py-4">
          <div className="text-2xl font-bold">{data?.availableRooms || 0}</div>
          <div className="text-xs">Available Rooms</div>
        </CardContent>
      </Card>
      <Card className="text-center h-24">
        <CardContent className="flex flex-col items-center justify-center gap-1.5  py-4">
          <div className="text-2xl font-bold">{data?.occupiedRooms || 0}</div>
          <div className="text-xs">Occupied Rooms</div>
        </CardContent>
      </Card>
      <Card className="text-center h-24">
        <CardContent className="flex flex-col items-center justify-center gap-1.5  py-4">
          <div className="text-2xl font-bold">{data?.dirtyRooms || 0}</div>
          <div className="text-xs">Unclean Rooms</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomCard;
