function SelectedNFT({ nft, onRemoveNFT}) {
  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  };

  if (!nft) {
    return <p className="text-white/50">No NFT selected</p>;
  }

  return (
    <div className="flex w-full text-white gap-4 justify-between items-center">
      <div className="flex gap-4 items-center">
        {nft.image ? (
          <img src={nft.image} className="w-16 h-16  object-cover rounded-lg" />
        ) : (
          <div className="w-16 h-16 bg-black rounded-lg"></div>
        )}

        <div className="flex flex-col">
          <p className="text-white/50 text-sm uppercase font-mono tracking-widest">
            {nft.collection}
          </p>
          <p className="text-white text-lg">{nft.name}</p>
          <p className="text-white/80">{truncateAddress(nft.address)}</p>
        </div>
      </div>

      <button
        onClick={() => onRemoveNFT(nft)}
        className="bg-white/15 transition-colors duration-300 hover:bg-white/30 rounded-full p-2 cursor-pointer"
      >
        <img
          className="h-[10px]"
          src="/icons/close.svg"
          alt="Close Wallet dropdown"
        />
      </button>
    </div>
  );
}

export default SelectedNFT;
