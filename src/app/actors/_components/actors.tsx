import ActorOne from "~/app/_assets/dummies/actor-1.jpg";
import ActorTwo from "~/app/_assets/dummies/actor-2.jpg";
import ActorThree from "~/app/_assets/dummies/actor-3.jpg";
import ActorFour from "~/app/_assets/dummies/actor-4.jpg";
import ActorFive from "~/app/_assets/dummies/actor-5.jpg";
import ActorSix from "~/app/_assets/dummies/actor-6.jpg";
import ActorSeven from "~/app/_assets/dummies/actor-7.jpg";

import { MovieCard } from "~/components/movie-card";
import Link from "next/link";

const actorsImgs = [
  ActorOne,
  ActorTwo,
  ActorThree,
  ActorFour,
  ActorFive,
  ActorSix,
  ActorSeven,
];

const Actors: React.FC = () => {
  return (
    <div className="grid grid-cols-2 items-stretch gap-2 md:grid-cols-4 lg:grid-cols-6">
      {actorsImgs.map((img, index) => {
        return (
          <Link key={img.src} href={`/actors/${index + 1}`}>
            <MovieCard
              src={img}
              alt="movie"
              key={img.src}
              imgClassName="object-top"
            />
          </Link>
        );
      })}
    </div>
  );
};

export { Actors };
