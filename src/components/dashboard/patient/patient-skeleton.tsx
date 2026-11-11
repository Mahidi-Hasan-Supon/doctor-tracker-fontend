
import { Skeleton } from "@/components/ui/skeleton";

const PatientPageSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Patient Count Skeleton */}
      <div className="flex justify-between">
        <Skeleton className="h-5 w-32" />
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="border-b p-4">
          <div className="grid grid-cols-9 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={Number(index)} className="h-5 w-full" />
            ))}
          </div>
        </div>

        <div className="space-y-5 p-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={Number(index)} className="grid grid-cols-9 items-center gap-4">
              {Array.from({ length: 9 }).map((_, cellIndex) => (
                <Skeleton key={Number(cellIndex)} className="h-6 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientPageSkeleton;
