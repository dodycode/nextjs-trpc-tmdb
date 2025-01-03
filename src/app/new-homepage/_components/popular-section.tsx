"use client";

import { MovieCard } from "~/components/movie-card";
import { PageHeader } from "~/components/page-header";
import { Button } from "~/components/ui/button";
import { useIsMobile } from "~/hooks/use-mobile";

const PopularSection: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Popular this week" />
      <div className="grid grid-cols-3 items-stretch gap-2 lg:grid-cols-7">
        {Array(isMobile ? 6 : 14)
          .fill(null)
          .map((_, index) => (
            <MovieCard key={index} alt="dummy" />
          ))}
      </div>
      <div className="flex justify-end">
        <Button>View more</Button>
      </div>
    </div>
  );
};

export { PopularSection };
