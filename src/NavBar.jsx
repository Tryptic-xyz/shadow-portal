import logo from "./assets/shadow-logo.svg";
import ConnectWallet from "./ConnectWallet.jsx";
import Menu from "./Menu.jsx";

function NavBar({ setIsLoggedIn }) {
  return (
    <div className=" flex justify-between w-full ">
      <a href="/" rel="noopener noreferrer">
        <img src={logo} alt="Shadow Portal Logo" className="h-10 md:h-12" />
      </a>
      <div className="flex gap-3">
        <ConnectWallet setIsLoggedIn={setIsLoggedIn} />
        <Menu />
      </div>
    </div>
  );
}

export default NavBar;
