"use client";

import { toast } from "sonner";

import { useEffect, useState } from "react";

import { Cast } from "~/app/details/_components/casts-tab";
import { api, type RouterOutputs } from "~/trpc/react";
import { Button } from "~/components/ui/button";

interface Props {
  initialData: RouterOutputs["tmdb"]["people"];
}

// Todo: use infinite scroll for pagination
const Actors: React.FC<Props> = ({ initialData }) => {
  const [page, setPage] = useState(1);
  const [actorsData, setActorsData] = useState(
    initialData.filter(
      (actor) => actor.name !== "" && actor.nationality === "South Korean",
    ),
  );

  const {
    data: actors,
    isFetching,
    isPending,
    refetch,
    isSuccess,
  } = api.tmdb.people.useQuery(
    { cursor: page },
    {
      initialData,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      select: (data) => {
        return data.filter(
          (actor) => actor.nationality === "South Korean" && actor.name !== "",
        );
      },
      enabled: !!page,
    },
  );

  useEffect(() => {
    if (isFetching || isPending) return;
    if (isSuccess && actors.length && page > 1) {
      setActorsData((prev) => {
        const newActors = actors.filter(
          (actor) => !prev.find((a) => a.url === actor.url),
        );
        return [...prev, ...newActors];
      });
    }
  }, [isSuccess, isFetching, isPending, actors, page]);

  useEffect(() => {
    if (isFetching || isPending) {
      toast("Crawling more people...");
    }
  }, [isFetching, isPending]);

  useEffect(() => {
    if (page === 1) return;
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 items-stretch gap-10 md:grid-cols-4 lg:grid-cols-6">
        {actorsData?.map((actor, index) => (
          <Cast
            key={index}
            alt={actor.name}
            name={actor.name}
            src={actor.image}
          />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isPending || isFetching}
        >
          {isPending || isFetching ? "Loading..." : "Load more"}
        </Button>
      </div>
    </div>
  );
};

export { Actors };
