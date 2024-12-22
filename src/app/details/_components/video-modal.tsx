"use client";
import ReactPlayer from "react-player/lazy";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useIsMobile } from "~/hooks/use-mobile";

const VideoModal: React.FC<{ url: string; children: React.ReactNode }> = ({
  url,
  children,
}) => {
  const isMobile = useIsMobile();
  if (!url) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="h-dvh min-w-[70vw] border-none bg-transparent p-0 lg:h-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="hidden">&nbsp;</DialogTitle>
        <ReactPlayer
          url={url}
          width="100%"
          height={isMobile ? "100dvh" : "500px"}
          playing={true}
          loop={true}
          playsinline={true}
          stopOnUnmount={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export { VideoModal };
