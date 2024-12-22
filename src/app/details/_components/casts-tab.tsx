"use client";

import { TabsContent } from "~/components/ui/tabs";

import NextAvatar from "~/components/next-avatar";
import type { DetailsTabsProps } from "./tabs";
import { api } from "~/trpc/react";
import { useMemo } from "react";

const baseURL = "https://image.tmdb.org/t/p/w300";

const Cast: React.FC<{
  alt: string;
  src: string;
  name: string;
  job: string;
}> = ({ alt, src, name, job }) => {
  if (!src) {
    src = "https://placehold.co/128x128.png?text=No+Image";
  } else {
    src = `${baseURL}${src}`;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-none flex-col items-center gap-6">
        <NextAvatar
          src={src}
          alt={alt}
          className="object-cover"
          width={128}
          height={128}
        />
        <div className="flex flex-col gap-2">
          <span className="font-bold">{name}</span>
          <span className="text-sm text-muted-foreground">{job}</span>
        </div>
      </div>
    </div>
  );
};

const DetailsCasts: React.FC<DetailsTabsProps> = ({ type, id }) => {
  const utils = api.useUtils();

  const cast = useMemo(() => {
    if (type === "movie") {
      const movieCredits = utils.tmdb.movieCredits.getData({ movie_id: id });
      if (!movieCredits) return [];

      // We only show crew that have profile image
      const filteredCrew = movieCredits.crew.filter(
        (crew) => crew.profile_path,
      );

      const cast = [...movieCredits.cast, ...filteredCrew];

      return cast;
    }
    return [];
  }, [type, id, utils.tmdb.movieCredits]);

  return (
    <TabsContent value="casts">
      <div className="flex flex-wrap items-center justify-center gap-10 py-8 lg:justify-start">
        {cast.map((cast) => (
          <Cast
            key={cast.id}
            alt={cast.original_name}
            name={cast.name}
            src={cast.profile_path ?? ""}
            job={cast.known_for_department}
          />
        ))}
      </div>
    </TabsContent>
  );
};

export { DetailsCasts };
