
import logo from "/icons/shadow-logo.svg"
import ConnectWallet from "./ConnectWallet.jsx";
import Menu from "./Menu.jsx";

function NavBar({ setIsLoggedIn }) {
  return (
    <div className=" flex justify-between w-full px-2 md:px-0 py-4">
      <a href="/" rel="noopener noreferrer">
        <img src={logo} alt="Shadow Portal Logo" className="h-10 md:h-12" />
      </a>
      <div className="flex gap-3">
        <div className="hidden md:block">
          <ConnectWallet setIsLoggedIn={setIsLoggedIn} />
        </div>
        <Menu
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>
    </div>
  );
}

export default NavBar;
