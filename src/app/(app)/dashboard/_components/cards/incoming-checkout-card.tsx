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
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Incoming Checkout</CardTitle>
        <CardDescription>Incoming checkout reminder.</CardDescription>
      </CardHeader>

      <ScrollArea className="h-48">
        <CardContent className="grid gap-1 ">
          <Badge
            variant={"outline"}
            className="-mx-2  flex items-center space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground"
          >
            <Bell className="mt-px h-5 w-5" />
            <div className="space-y-1 flex justify-between items-center flex-1 ">
              <p className="text-sm font-medium leading-none">
                Room No. A - 101
              </p>
              <p className="text-sm text-muted-foreground">23.01.2023</p>
            </div>
          </Badge>

          <Badge
            variant={"outline"}
            className="-mx-2 flex items-center space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground"
          >
            <Bell className="mt-px h-5 w-5" />
            <div className="space-y-1 flex justify-between items-center flex-1 ">
              <p className="text-sm font-medium leading-none">
                Room No. A - 101
              </p>
              <p className="text-sm text-muted-foreground">23.01.2023</p>
            </div>
          </Badge>
        
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default IncomingCheckoutCard;
