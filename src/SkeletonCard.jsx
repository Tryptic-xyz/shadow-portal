import "./styles/nft-card.css"

const SkeletonCard= () => {
  return (
    <div className="skeleton-card">
      <div className="relative">
        <div className="w-full aspect-4/3 bg-blue-300/10 h-fit rounded-md md:rounded-lg"></div>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="w-1/2 bg-blue-300/10 h-3"></div>
        <div className="flex flex-col md:flex-row  justify-between gap-2">
          <div className="w-full bg-blue-300/10 h-3"></div>
          <div className="w-1/2 bg-blue-300/10 h-3"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
