import { ChevronRight } from "lucide-react";
import React from "react";
import LostAndFound from "./_components/form/lost-and-found";

const Page = () => {
  return (
    <div className="flex p-1 w-full flex-col gap-4">
      <div className="flex items-center gap-x-1">
        <span className="font-medium">InnControl</span>
        <ChevronRight size={19} />
        <span className="font-medium">Lost & Found</span>
      </div>

      <LostAndFound />  
       
    </div>
  );
};

export default Page;
