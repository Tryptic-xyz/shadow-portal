import NetworkIcons from "./NetworkIcons.jsx";
import "./styles/nft-card.css"
import truncateAddress from "./utils/truncateAddress"; 

const NFTCard = ({
  image,
  collection,
  name,
  address,
  networks,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={`nft-card h-fit ${isSelected ? "nft-card-selected" : ""}`}
      onClick={onSelect}
    >
      <div className="relative">
        <img
          src={image || `/images/ape-placeholder.png`}
          alt={name}
          className="w-full aspect-4/3 object-cover rounded-md md:rounded-lg"
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
          <p className="text-blue-100 text-base">{name}</p>
          <p className={isSelected ? "text-blue-100" : "text-blue-100/50"}>
            {truncateAddress(address)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
