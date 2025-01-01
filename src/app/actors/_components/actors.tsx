"use client";

import { useEffect } from "react";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { api } from "~/trpc/react";

const Actors: React.FC = () => {
  const { data: actors, isLoading } = api.tmdb.people.useQuery();

  useEffect(() => {
    console.log("actors", actors);
  }, [actors, isLoading]);

  return (
    <div className="grid grid-cols-2 items-stretch gap-2 md:grid-cols-4 lg:grid-cols-6">
      <Alert className="col-span-6 bg-secondary text-secondary-foreground">
        <AlertDescription className="text-lg">Coming Soon!</AlertDescription>
      </Alert>
    </div>
  );
};

export { Actors };
