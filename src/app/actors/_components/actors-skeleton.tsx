import { Skeleton } from "~/components/ui/skeleton";

const ActorsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 items-stretch gap-10 md:grid-cols-4 lg:grid-cols-6">
      {new Array(12).fill(0).map((_, index) => (
        <Skeleton key={index} className="h-[128px] w-[128px] rounded-full" />
      ))}
    </div>
  );
};

export { ActorsSkeleton };
