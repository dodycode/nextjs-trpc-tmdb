// If you want to add a new lucideicon, add it ordered alphabetically in the icons object.
// If its a custom icon, add it to the end of the object.
import type { RefAttributes } from "react";
import {
  CheckIcon,
  PlayIcon,
  SearchIcon,
  PlusIcon,
  TvIcon,
  ClapperboardIcon,
  XIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  FilterIcon,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

import { cn } from "~/lib/utils";
import { CaretDownAndUpIcon } from "./icons/caret-down-up-icon";

const icons = {
  search: SearchIcon,
  check: CheckIcon,
  play: PlayIcon,
  plus: PlusIcon,
  tv: TvIcon,
  clapperBoard: ClapperboardIcon,
  caretDownAndUp: CaretDownAndUpIcon,
  close: XIcon,
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  filter: FilterIcon,
} as const;

export type IconType = keyof typeof icons;
export type IconProps = Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>;

export const Icon = ({
  type,
  className,
}: {
  type: IconType;
  className?: string;
}) => {
  const IconComponent = icons[type];

  return <IconComponent className={cn("size-5", className)} />;
};
