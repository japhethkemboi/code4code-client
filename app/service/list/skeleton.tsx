export const ServiceSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="rounded-full w-1/4 h-4 bg-[var(--simmer-color)] animate-pulse"></div>
      <div className="flex flex-col gap-2">
        <div className="rounded-full w-full h-2 bg-[var(--simmer-color)] animate-pulse"></div>
        <div className="rounded-full w-full h-2 bg-[var(--simmer-color)] animate-pulse"></div>
        <div className="rounded-full w-3/4 h-2 bg-[var(--simmer-color)] animate-pulse"></div>
      </div>
      <div className="flex gap-2">
        <div className="rounded-xl h-10 w-36 bg-[var(--simmer-color)] animate-pulse"></div>
        <div className="rounded-xl h-10 w-36 bg-[var(--simmer-color)] animate-pulse"></div>
      </div>
    </div>
  );
};
