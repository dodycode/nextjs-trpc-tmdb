"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="h-dvh min-w-[70vw] border-none bg-transparent p-0 lg:h-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="hidden">&nbsp;</DialogTitle>
        <div className="relative h-dvh w-full min-w-[70vw] lg:h-[500px]">
          {isLoading && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              Loading...
            </div>
          )}
          <Image
            src={`${baseURL}${url}`}
            alt=""
            fill
            sizes="(max-width: 768px) 400px, (max-width: 1024px) 500px"
            className="h-full w-full object-contain"
            priority={true}
            onLoad={() => {
              setIsLoading(false);
            }}
            quality={100}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ImageModal };
