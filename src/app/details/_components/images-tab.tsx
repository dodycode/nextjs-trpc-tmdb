import { useMemo } from "react";

import { TabsContent } from "~/components/ui/tabs";
import type { DetailsTabsProps } from "./tabs";
import useMovieImages from "~/hooks/use-movie-images";
import { useMovieDetailsContext } from "../_context/details-provider";
import { ImageGroup } from "~/components/image-group";

const DetailsImages: React.FC<DetailsTabsProps> = ({ type, id }) => {
  const { movieImagesInitialData } = useMovieDetailsContext();

  const { movieImages, isLoadingMovieImages } = useMovieImages(
    id,
    type,
    movieImagesInitialData,
  );

  const images = useMemo(() => {
    if (movieImages?.backdrops?.length && !isLoadingMovieImages) {
      return movieImages.backdrops.map((image) => image.file_path);
    }

    return [];
  }, [movieImages, isLoadingMovieImages]);

  return (
    <TabsContent value="images">
      <div className="w-full px-4 lg:pr-20">
        {isLoadingMovieImages && "Loading..."}
        {!images.length && "No images found"}
        {images.length && (
          <ImageGroup
            images={images.map((image) => ({ src: image, alt: "" }))}
          />
        )}
      </div>
    </TabsContent>
  );
};

export { DetailsImages };
