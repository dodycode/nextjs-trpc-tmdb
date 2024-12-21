const BackgroundStars: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-full w-full bg-[url('/stars.svg')] bg-[length:100%_auto] bg-no-repeat">
      {children}
    </div>
  );
};

export { BackgroundStars };
