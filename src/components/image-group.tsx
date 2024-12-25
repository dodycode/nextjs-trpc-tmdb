import { useState } from "react";
import { AnimatePresence } from "motion/react";

import { FullscreenImage } from "./fullscreen-image";
import type { ImageItem } from "~/types/image";
import CldImage from "./cld-image";
import { MasonryGrid } from "./masonry-grid";

interface ImageGroupProps {
  images: ImageItem[];
}

const baseURL = "https://image.tmdb.org/t/p/original";

export const ImageGroup: React.FC<ImageGroupProps> = ({ images }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleImageClick = (id: string) => {
    setSelectedId(id);
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  const handleNavigate = (id: string) => {
    setSelectedId(id);
  };

  return (
    <MasonryGrid className="grid-cols-1 md:grid-cols-3">
      {images.map((image) => (
        <div
          key={image.src}
          onClick={() => handleImageClick(image.src)}
          className="group relative cursor-pointer overflow-hidden"
        >
          <CldImage
            src={`${baseURL}${image.src}`}
            alt={image.alt}
            className="object-cover object-center transition-all duration-300 ease-in-out group-hover:scale-110"
            fill
            sizes="(max-width: 768px) 300px, (max-width: 1024px) 500px, 500px"
            showloading="true"
          />
        </div>
      ))}
      <AnimatePresence>
        {selectedId !== null && (
          <FullscreenImage
            images={images}
            currentId={selectedId}
            onClose={handleClose}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>
    </MasonryGrid>
  );
};
