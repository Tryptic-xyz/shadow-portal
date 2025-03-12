
import ConnectWallet from "./ConnectWallet.jsx";
import Menu from "./Menu.jsx";

function NavBar({ setIsLoggedIn }) {
  return (
    <div className=" flex justify-between w-full py-4">
      <a href="/" rel="noopener noreferrer">
        <img src="/images/shadow-logo.svg" alt="Shadow Portal Logo" className="h-10 md:h-12" />
      </a>
      <div className="flex gap-3">
        <ConnectWallet setIsLoggedIn={setIsLoggedIn} />
        <Menu />
      </div>
    </div>
  );
}

export default NavBar;
