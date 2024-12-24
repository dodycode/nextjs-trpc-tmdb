import { Skeleton } from "~/components/ui/skeleton";

const ShowsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 items-stretch gap-2 md:grid-cols-4 lg:grid-cols-7">
      <Skeleton className="h-[250px] w-full lg:h-[280px]" />
      <Skeleton className="h-[250px] w-full lg:h-[280px]" />
      <Skeleton className="h-[250px] w-full lg:h-[280px]" />
      <Skeleton className="h-[250px] w-full lg:h-[280px]" />
      <Skeleton className="h-[250px] w-full lg:h-[280px]" />
      <Skeleton className="h-[250px] w-full lg:h-[280px]" />
      <Skeleton className="h-[250px] w-full lg:h-[280px]" />
    </div>
  );
};

export { ShowsSkeleton };
