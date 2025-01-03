import { useMemo } from "react";
import { cn } from "~/lib/utils";
import CldImage from "./cld-image";

interface MovieCardProps {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

export const baseURL = "https://image.tmdb.org/t/p/w500";

const MovieCard: React.FC<MovieCardProps> = ({
  src,
  alt,
  className,
  imgClassName,
}) => {
  const posterPath = useMemo(() => {
    if (!src) {
      return "https://placehold.co/187x280.png?text=No+Image";
    }

    return `${baseURL}${src}`;
  }, [src]);

  return (
    <div className="group flex flex-col gap-2">
      <div
        className={cn(
          "relative h-[150px] w-full overflow-hidden rounded-sm md:h-[280px]",
          className,
        )}
      >
        <CldImage
          src={posterPath}
          alt={alt}
          className={cn(
            "object-cover object-center transition-all duration-300 ease-in-out group-hover:scale-110",
            imgClassName,
          )}
          quality={85}
          sizes="(max-width: 768px) 167px, (max-width: 1024px) 215px, 200px"
          fill
          showloading="true"
        />
      </div>
    </div>
  );
};

export { MovieCard };
