import { ChevronRight } from "lucide-react";
import BlobProviderComponent from "./_components/blob-provider";

const Page = () => {
  const invoice = {
    id: 1,
    name: "Sample Invoice",
    dateCreated: Date.now(),
    value: 1234,
    description: "This is a sample invoice.",
    status: "open",
    customer: {
      name: "John Smith",
      email: "john@smith.com",
    },
  };

  return (
    <div className="flex p-1 w-full flex-col gap-4">
      <div className="flex items-center gap-x-1">
        <span className="font-medium">InnControl</span>
        <ChevronRight size={19} />
        <span className="font-medium">Reports</span>
      </div>
      <BlobProviderComponent invoice={invoice} />

     
    </div>
  );
};

export default Page;
