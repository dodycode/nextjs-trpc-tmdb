import Image, { type StaticImageData } from "next/image";
import { cn } from "~/lib/utils";

interface MovieCardProps {
  src: StaticImageData;
  alt: string;
  className?: string;
  imgClassName?: string;
}

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
        src={src}
        alt={alt}
        className={cn(
          "object-cover object-center transition-all duration-300 ease-in-out group-hover:scale-110",
          imgClassName,
        )}
        placeholder="blur"
        fill
      />
    </div>
  );
};

export { MovieCard };
