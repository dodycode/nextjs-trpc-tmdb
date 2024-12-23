"use client";
import { type RefObject, useState } from "react";
import {
  CldImage as CldImageDefault,
  type CldImageProps,
} from "next-cloudinary";
import { cn } from "~/lib/utils";
import { Skeleton } from "./ui/skeleton";

const CldImage = (
  props: CldImageProps & { ref?: RefObject<HTMLImageElement | null> },
) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Skeleton className="h-full w-full" />}
      <CldImageDefault
        ref={props.ref}
        className={cn(
          props.className,
          "transition-opacity duration-300 ease-in-out",
        )}
        style={{
          opacity: isLoading ? 0 : 1,
        }}
        onLoad={() => setIsLoading(false)}
        deliveryType="fetch"
        unoptimized={props.src.includes("placehold.co")}
        {...props}
      />
    </>
  );
};

export default CldImage;
