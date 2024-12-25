"use client";
import { type RefObject, useState } from "react";
import {
  CldImage as CldImageDefault,
  type CldImageProps,
} from "next-cloudinary";
import { cn } from "~/lib/utils";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

const CldImage = (
  props: CldImageProps & {
    ref?: RefObject<HTMLImageElement | null>;
    showloading?: string;
  },
) => {
  const [isLoading, setIsLoading] = useState(true);

  if (props.src.includes("placehold.co")) {
    return (
      <Image
        ref={props.ref}
        src={props.src}
        alt={props.alt}
        className={cn(
          props.className,
          "transition-opacity duration-300 ease-in-out",
        )}
        fill={props.fill}
        sizes={props.sizes}
        unoptimized
      />
    );
  }

  return (
    <>
      {props.showloading && isLoading && <Skeleton className="h-full w-full" />}
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
        format="webp"
        {...props}
      />
    </>
  );
};

export default CldImage;
