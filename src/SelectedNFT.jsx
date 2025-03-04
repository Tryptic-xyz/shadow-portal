    

    function SelectedNFT() {
      return (
        <div className="flex w-full text-white gap-4 justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="h-16 w-16 bg-black/20 rounded-lg"></div>
            <p className="text-white/20">No Asset Selected</p>
          </div>

          <div
            className="bg-white/15 transition-colors duration-300  hover:bg-white/30 rounded-full p-2 cursor-pointer opacity-50"
          >
            <img
              className="h-[10px]"
              src="/icons/close.svg"
              alt="Close Wallet dropdown"
            />
          </div>
        </div>
      );
    }

    export default SelectedNFT