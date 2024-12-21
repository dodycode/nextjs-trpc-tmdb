import MovieOne from "../_assets/dummies/movie-1.jpg";
import MovieTwo from "../_assets/dummies/movie-2.jpg";
import MovieThree from "../_assets/dummies/movie-3.jpg";
import MovieFour from "../_assets/dummies/movie-4.jpg";
import MovieFive from "../_assets/dummies/movie-5.jpg";
import MovieSix from "../_assets/dummies/movie-6.jpg";
import MovieSeven from "../_assets/dummies/movie-7.jpg";
import MovieEight from "../_assets/dummies/movie-8.jpg";
import { MovieCard } from "~/components/movie-card";
import Link from "next/link";

const movieImgs = [
  MovieOne,
  MovieTwo,
  MovieThree,
  MovieFour,
  MovieFive,
  MovieSix,
  MovieSeven,
  MovieEight,
];

const Movies: React.FC = () => {
  return (
    <div className="grid grid-cols-2 items-stretch gap-2 md:grid-cols-4 lg:grid-cols-7">
      {movieImgs.map((img, index) => {
        return (
          <Link key={img.src} href={`/details/${index + 1}`}>
            <MovieCard src={img} alt="movie" key={img.src} />
          </Link>
        );
      })}
    </div>
  );
};

export { Movies };
