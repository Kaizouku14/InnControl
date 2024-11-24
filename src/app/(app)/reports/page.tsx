"use client";

import { ChevronRight } from "lucide-react";
import BlobProviderComponent from "./_components/blob-provider";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./_components/table/columns";
import { api } from "@/app/_trpc/client";
import { Reports } from "@/interface/reports";

const Page = () => {
  const { data } = api.transaction.getAllTransaction.useQuery();

  const transactions: Reports[] = [
    {
      guest_fullname: "John Doe",
      room_no: "101",
      check_in: "2024-11-01",
      check_out: "2024-11-05",
      no_of_nights: 4,
      payment_amount: 200.0,
      payment_date: "2024-11-01",
      payment_method: "Credit-card",
      booking_type: "Online",
      additional_service: "Breakfast",
      outstanding_balance: 0,
      discount: null,
      status: "active",
    },
  ];

  return (
    <div className="flex p-1 w-full flex-col gap-4">
      <div className="flex items-center gap-x-1">
        <span className="font-medium">InnControl</span>
        <ChevronRight size={19} />
        <span className="font-medium">Reports</span>
      </div>

      <div className="flex-1 flex flex-col gap-y-4 py-3  mr-12">
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Rooms</h1>
            <BlobProviderComponent transactions={transactions} />
          </div>

          {data && <DataTable columns={columns} data={data} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
