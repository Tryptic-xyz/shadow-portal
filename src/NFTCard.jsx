import placeholder from "./assets/ape-placeholder.png";
import NetworkIcons from "./NetworkIcons.jsx";

const truncateAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};

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
      className={`nft-card h-fit ${
        isSelected ? "nft-card-selected" : ""
      }`}
      onClick={onSelect}
    >
      <div className="relative">
        <img
          src={image || placeholder}
          alt={name}
          className="w-full aspect-4/3 object-cover rounded-lg"
        />
        <NetworkIcons networks={networks} />

        <div
          className={`absolute flex justify-center items-center top-2 left-2 border-2 h-6 w-6 rounded-full shadow-md border-white cursor-pointer ${
            isSelected ? "bg-blue-500 opacity-100" : "bg-blue-900/5 opacity-25"
          }`}
        >
          {isSelected && <img src="/icons/checkmark.svg"  />}
        </div>
      </div>
      <div className="flex flex-col">
        <p
          className={`font-mono uppercase tracking-widest text-sm ${
            isSelected ? "text-white" : "text-blue-300"
          }`}
        >
          {collection}
        </p>
        <div className="flex justify-between text-lg">
          <p className="text-blue-100">{name}</p>
          <p className={isSelected ? "text-blue-100" : "text-blue-100/50"}>
            {truncateAddress(address)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
