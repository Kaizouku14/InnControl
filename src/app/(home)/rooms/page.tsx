import { ChevronRight } from "lucide-react";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const Page = () => {

  const rooms = [
    {
      room_no: "101",
      type: "SR Deluxe",
      rate: 150,
      status: "available",
      capacity: 2,
      floor: 1,
    },
    {
      room_no: "102",
      type: "SR Prime",
      rate: 200,
      status: "occupied",
      capacity: 3,
      floor: 1,
    },
    {
      room_no: "103",
      type: "SR Premier",
      rate: 250,
      status: "dirty",
      capacity: 2,
      floor: 2,
    },
    {
      room_no: "104",
      type: "ER 1 Bed Room",
      rate: 100,
      status: "available",
      capacity: 1,
      floor: 1,
    },
    {
      room_no: "105",
      type: "ER 2 Bed Room",
      rate: 120,
      status: "available",
      capacity: 2,
      floor: 2,
    },
    {
      room_no: "106",
      type: "SR Deluxe",
      rate: 180,
      status: "occupied",
      capacity: 2,
      floor: 1,
    },
    {
      room_no: "107",
      type: "SR Prime",
      rate: 220,
      status: "dirty",
      capacity: 3,
      floor: 2,
    },
    {
      room_no: "108",
      type: "SR Premier",
      rate: 300,
      status: "available",
      capacity: 2,
      floor: 3,
    },
    {
      room_no: "109",
      type: "ER 1 Bed Room",
      rate: 110,
      status: "occupied",
      capacity: 1,
      floor: 3,
    },
    {
      room_no: "110",
      type: "ER 2 Bed Room",
      rate: 130,
      status: "dirty",
      capacity: 2,
      floor: 1,
    },
  ];
  

  return (
    <div className="flex flex-col p-1 w-full">
      <div className="flex items-center gap-x-1">
        <span className="font-medium">Project Name</span>
        <ChevronRight size={19} />
        <span className="font-medium">Rooms</span>
      </div>

      <div className="flex-1 py-3 md:mr-8 mr-6 ">
          <DataTable columns={columns} data={rooms}/>
      </div>
    </div>
  );
};

export default Page;
