import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

const TableSkeleton = () => {
  return (
    <div className="flex flex-col p-1 w-full">
      <div className="flex items-center gap-x-1">
        <Skeleton className="h-6 w-24" />
        <ChevronRight size={19} />
        <Skeleton className="h-6 w-16" />
      </div>

      <div className="flex-1 flex flex-col py-3 gap-2 md:mr-8 mr-12">
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <div className="mb-4 flex flex-wrap gap-2">
            <Skeleton className="w-full md:w-52 h-10" />
            <Skeleton className="w-full md:w-36 h-10" />
            <Skeleton className="w-full md:w-36 h-10" />
          </div>
          <Skeleton className="w-full md:w-36 h-10" />
        </div>

        <Skeleton className="h-96 w-full" />

        <div className="mb-4 flex flex-col md:flex-row justify-between gap-2">
          <Skeleton className="w-full md:w-52 h-10" />
          <div className="flex flex-col sm:flex-row gap-2">
            <Skeleton className="w-full sm:w-36 h-10" />
            <Skeleton className="w-full sm:w-36 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
