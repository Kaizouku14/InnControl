import React from "react";
import { VisitorDistributionChart } from "./_components/charts/radar-chart";
import { ChevronRight } from "lucide-react";
import { TotalRevenueChart } from "./_components/charts/total-revenue-chart";
import RoomCard from "./_components/cards/room-card";
import IncomingCheckoutCard from "./_components/cards/incoming-checkout-card";
import FeaturedRooms from "./_components/cards/featured-rooms";

const Page = () => {
  return (
    <div className="flex flex-col p-1 w-full">
      <div className="flex items-center gap-x-1">
        <span className="font-medium">InnControl</span>
        <ChevronRight size={19} />
        <span className="font-medium">Dashboard</span>
      </div>

      <div className="flex flex-col py-2 gap-6 pr-8 w-full ">
        <div className="grid md:grid-cols-3 gap-4">
          <VisitorDistributionChart />
          <div className="flex flex-col gap-4 ">
            <RoomCard />
            <TotalRevenueChart />
          </div>
          <IncomingCheckoutCard />
        </div>

        <FeaturedRooms />
      </div>
    </div>
  );
};

export default Page;
