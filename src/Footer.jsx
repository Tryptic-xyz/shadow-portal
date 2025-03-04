
function Footer() {
  return (
    <div className="flex justify-between w-full border-t-1 border-white/20 text-white/30 py-4">
      <p className="text-xs">©2025 ShadowPortal</p>
      <div className="flex gap-4 text-xs ">
        <a
          href=""
          className="hover:text-white/80 transition-colors duration-500"
        >
          Terms of Service
        </a>
        <a
          href=""
          className="hover:text-white/80 transition-colors duration-500"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
}

export default Footer


  