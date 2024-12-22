import type { ReactNode } from "react";

import { cn } from "~/lib/utils";

type MasonryGridProps = {
  children: ReactNode;
  className?: string;
};

const MasonryGrid = ({ children, className }: MasonryGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export { MasonryGrid };
