import { Skeleton } from "@/components/ui/skeleton";

export default function Skeletons() {
  return (
    <div>
      <div className="mb-4">
        <Skeleton className="h-3 w-[40%] rounded-full" />
      </div>
      <div>
        <Skeleton className="h-[240px] w-[240px] rounded-lg" />
      </div>
      <div className="mt-5">
        <Skeleton className="h-4 rounded-full w-[50%]" />
      </div>
    </div>
  );
}
