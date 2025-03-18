import { useState, useEffect } from "react";
import NetworkIcons from "./NetworkIcons.jsx";
import "./styles/nft-card.css";
import SkeletonCard from "./SkeletonCard.jsx";

const NFTCard = ({
  image,
  collection,
  name,
  networks,
  onSelect,
  isSelected,
  onImageLoad,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);

  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.src = image || `/images/ape-placeholder.png`;

    img.onload = () => {
      console.log("Image loaded successfully:", name);
      setImageUrl(img.src);
      setIsLoading(false);
      if (onImageLoad) onImageLoad();
    };

    img.onerror = () => {
      console.log("Image failed to load:", name);
      setImageUrl(`/images/ape-placeholder.png`);
      setIsLoading(false);
      if (onImageLoad) onImageLoad();
    };
  }, [image, name, onImageLoad]);

  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <div
      className={`nft-card h-fit ${isSelected ? "nft-card-selected" : ""}`}
      onClick={onSelect}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full aspect-1/1 object-cover rounded-md md:rounded-lg"
        />
        <NetworkIcons networks={networks} />

        <div
          className={`absolute flex justify-center items-center top-2 left-2 border md:border-2 h-4 w-4 md:h-6 md:w-6 rounded-full shadow-md border-white cursor-pointer ${
            isSelected ? "bg-blue-500 opacity-100" : "bg-blue-900/5 opacity-25"
          }`}
        >
          {isSelected && <img src="/icons/checkmark.svg" />}
        </div>
      </div>
      <div className="flex flex-col">
        <p
          className={`font-mono uppercase tracking-wide md:tracking-widest text-[10px] md:text-sm ${
            isSelected ? "text-white" : "text-blue-300"
          }`}
        >
          {collection}
        </p>
        <div className="flex flex-col md:flex-row text-sm md:justify-between md:text-lg">
          <p className="text-blue-100 text-base md:text-lg">{name}</p>

        </div>
      </div>
    </div>
  );
};

export default NFTCard;
