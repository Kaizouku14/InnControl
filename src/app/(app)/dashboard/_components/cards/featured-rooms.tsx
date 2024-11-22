"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";

import { api } from "@/app/_trpc/client";

import ER1 from "../../../../assets/er-1.jpg";
import ER2 from "../../../../assets/er-2.jpg";
import SRDeluxe from "../../../../assets/sr-deluxe.jpg";
import SRPrime from "../../../../assets/sr-prime.jpg";
import SRPrimier from "../../../../assets/sr-premier.jpg";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedRooms = () => {
  const { data, isLoading } = api.transaction.getMostFeaturedRooms.useQuery();

  const roomImages: Record<string, StaticImageData> = {
    "SR Deluxe": SRDeluxe,
    "SR Prime": SRPrime,
    "SR Premier": SRPrimier,
    "ER 1 Bed Room": ER1,
    "ER 2 Bed Room": ER2,
  };

  const roomNames: Record<string, string> = {
    "SR Deluxe": "Studio Room Deluxe",
    "SR Prime": "Studio Room Prime",
    "SR Premier": "Studio Room Premier",
    "ER 1 Bed Room": "Executive Room 1 Bed Room",
    "ER 2 Bed Room": "Executive Room 2 Bed Room",
  };

  return (
    <Card className="flex-1 p-4">
      <CardTitle className="text-xl">Featured Rooms</CardTitle>
      <CardDescription>
        Top 3 most booked rooms in the last month.
      </CardDescription>
      <CardContent className="grid md:grid-cols-3 gap-2 py-2.5">
        {isLoading ? (
          <>
            <Skeleton className="w-full h-56 rounded-lg" />
            <Skeleton className="w-full rounded-lg" />
            <Skeleton className="w-full rounded-lg" />
          </>
        ) : (
          data?.slice(0, 3).map((room, index) => (
            <Badge
              key={index}
              variant="outline"
              className="rounded-lg flex flex-col items-center gap-2 py-1"
            >
              <Image
                src={roomImages[room?.[0]]}
                alt={room?.[0]}
                width={400}
                height={224}
                className="w-full h-56 rounded-lg object-cover"
              />
              <span className="text-base">{roomNames[room?.[0]]}</span>
            </Badge>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default FeaturedRooms;
