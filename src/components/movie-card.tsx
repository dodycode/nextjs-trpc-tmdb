import Image from "next/image";
import { cn } from "~/lib/utils";

interface MovieCardProps {
  src: string;
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
  return (
    <div
      className={cn(
        "group relative h-[250px] w-full overflow-hidden rounded-sm lg:h-[280px]",
        className,
      )}
    >
      <Image
        src={`${baseURL}${src}`}
        alt={alt}
        className={cn(
          "object-cover object-center transition-all duration-300 ease-in-out group-hover:scale-110",
          imgClassName,
        )}
        quality={100}
        sizes="(max-width: 768px) 167px, (max-width: 1024px) 215px, 200px"
        fill
      />
    </div>
  );
};

export { MovieCard };
