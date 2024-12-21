type PageHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col items-start justify-between gap-2 md:flex-row lg:gap-0">
      <h1 className="text-3xl font-bold">{title}</h1>
      {children}
    </div>
  );
};

export { PageHeader };
