
import { Skeleton } from "@/components/ui/skeleton";

const DoctorCardSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={Number(index)}
          className="space-y-4 rounded-2xl border bg-card p-6"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-xl" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>

          <div className="space-y-4 border-t pt-5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorCardSkeleton;
