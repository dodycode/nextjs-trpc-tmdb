import Image, { type StaticImageData } from "next/image";
import { cn } from "~/lib/utils";

interface MovieCardProps {
  src: StaticImageData;
  alt: string;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ src, alt, className }) => {
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
        objectFit="cover"
        objectPosition="top center"
        className="transition-all duration-300 ease-in-out group-hover:scale-110"
        placeholder="blur"
        fill
      />
    </div>
  );
};

export { MovieCard };
