"use client";

import CldImage from "~/components/cld-image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const baseURL = "https://image.tmdb.org/t/p/original";

const ImageModal: React.FC<{ url: string; children: React.ReactNode }> = ({
  url,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="h-dvh min-w-[70vw] border-none bg-transparent p-0 lg:h-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="hidden">&nbsp;</DialogTitle>
        <div className="relative mx-auto h-dvh w-full min-w-[70vw] lg:h-[500px]">
          <CldImage
            src={`${baseURL}${url}`}
            alt=""
            fill
            sizes="(max-width: 768px) 400px, (max-width: 1024px) 500px, 500px"
            className="h-full w-full object-contain"
            priority={true}
            quality={100}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ImageModal };
