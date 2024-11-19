"use client";

import { ChevronRight } from "lucide-react";
import React from "react";
import BookingForm from "./_components/forms/booking-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/app/_trpc/client";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./_components/table/columns";

const Page = () => {
  const { data } = api.transaction.getAllTransaction.useQuery();

  return (
    <div className="flex flex-col p-1 w-full">
      <div className="flex items-center gap-x-1">
        <span className="font-medium">InnControl</span>
        <ChevronRight size={19} />
        <span className="font-medium">Bookings</span>
      </div>

      <div className="flex-1 py-3 md:mr-8 mr-6">
        <Tabs defaultValue="booking-form" >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="booking-form">Reservation</TabsTrigger>
            <TabsTrigger value="transaction-table">Transaction</TabsTrigger>
          </TabsList>
          <TabsContent value="booking-form">
              <BookingForm />
          </TabsContent>
          <TabsContent value="transaction-table">
             {data && <DataTable columns={columns} data={data} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;


