"use client";

import { api } from "@/app/_trpc/client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";

const IncomingCheckoutCard = () => {
  const { data } = api.transaction.getIncomingCheckouts.useQuery();
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Incoming Checkouts</CardTitle>
        <CardDescription>Incoming checkouts reminder.</CardDescription>
      </CardHeader>

      <ScrollArea className="h-48">
        <CardContent className="grid gap-1 ">
          {data && data?.length > 0 ? (
            data?.map((values, index) => (
              <Badge
                key={index}
                variant={"outline"}
                className="-mx-2  flex items-center space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground"
              >
                <Bell className="mt-px h-5 w-5" />
                <div className="space-y-1 flex justify-between items-center flex-1 ">
                  <p className="text-sm font-medium leading-none">
                    Room No. {values.room_no}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(values.check_out).toDateString()}
                  </p>
                </div>
              </Badge>
            ))
          ) : (
            <Badge
              variant={"outline"}
              className="text-sm text-muted-foreground p-2 flex justify-center"
            >
              No incoming checkout.
            </Badge>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default IncomingCheckoutCard;
