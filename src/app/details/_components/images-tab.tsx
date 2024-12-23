import { useMemo } from "react";

import { TabsContent } from "~/components/ui/tabs";
import type { DetailsTabsProps } from "./tabs";
import { MasonryGrid } from "~/components/masonry-grid";
import { ImageModal } from "./image-modal";
import useMovieImages from "~/hooks/use-movie-images";
import CldImage from "~/components/cld-image";

const baseURL = "https://image.tmdb.org/t/p/original";

const DetailsImages: React.FC<DetailsTabsProps> = ({ type, id }) => {
  const { movieImages, isLoadingMovieImages } = useMovieImages(id, type);

  const images = useMemo(() => {
    if (movieImages?.backdrops?.length && !isLoadingMovieImages) {
      return movieImages.backdrops.map((image) => image.file_path);
    }

    return [];
  }, [movieImages, isLoadingMovieImages]);

  return (
    <TabsContent value="images">
      <div className="w-full px-4 lg:pr-20">
        <MasonryGrid className="grid-cols-1 md:grid-cols-3">
          {isLoadingMovieImages && "Loading..."}
          {!images.length && "No images found"}
          {images.map((image) => {
            if (!image) return null;

            return (
              <ImageModal key={image} url={`${baseURL}${image}`}>
                <div className="group relative col-span-1 cursor-pointer overflow-hidden rounded-xl">
                  <CldImage
                    src={`${baseURL}${image}`}
                    alt={image}
                    fill
                    sizes="(max-width: 768px) 300px, (max-width: 1024px) 500px"
                    className="object-cover object-center transition-all duration-300 ease-in-out group-hover:scale-110"
                    quality={100}
                  />
                </div>
              </ImageModal>
            );
          })}
        </MasonryGrid>
      </div>
    </TabsContent>
  );
};

export { DetailsImages };
