import { cn } from "~/lib/utils";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return <div className={cn("px-4 lg:px-20", className)}>{children}</div>;
};

export { Container };
