function SelectedNFT({ nft, onRemoveNFT }) {
  if (!nft) {
    return (
      <div className="flex w-full text-white gap-4 justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 bg-black/30 rounded-lg"></div>

          <p className="text-white/30 text-base md:text-lg">No NFT Selected</p>
        </div>


      </div>
    );
  }

  return (
    <div className="flex w-full text-white gap-4 justify-between items-center">
      <div className="flex gap-4 items-center">
        {nft.image ? (
          <img src={nft.image} className="w-16 h-16 object-cover rounded-lg" />
        ) : (
          <div className="w-16 h-16 bg-black rounded-lg"></div>
        )}

        <div className="flex flex-col">
          <p className="text-white/50 text-xs lg:text-sm uppercase font-mono tracking-widest">
            {nft.collection}
          </p>
          <p className="text-white text-base md:text-xl">{nft.name}</p>
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
