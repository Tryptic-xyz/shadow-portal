function Footer() {
  return (
    <div className="flex justify-between w-full border-t-1 border-white/20 text-white/30 py-4 mt-4">
      <p className="text-xs">©2025 ShadowPortal</p>
      <div className="flex gap-4 text-xs ">
        <a
          href="/terms"
          className="hover:text-white/80 transition-colors duration-500"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        <a
          href="/privacy"
          className="hover:text-white/80 transition-colors duration-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
}

export default Footer;
