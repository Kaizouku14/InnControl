import { ChevronRight } from "lucide-react";
import React from "react";
import CreateUserForm from "./_components/forms/create-user-form";

const Page = () => {
  return (
    <div className="flex flex-col p-1 w-full">
      <div className="flex items-center gap-x-1">
        <span className="font-medium">InnControl</span>
        <ChevronRight size={19} />
        <span className="font-medium">Accounts</span>
      </div>
      <div className="flex-1 py-4">
         <CreateUserForm/>
      </div>
    </div>
  );
};

export default Page;
