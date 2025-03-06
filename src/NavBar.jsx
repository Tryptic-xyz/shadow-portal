import logo from './assets/shadow-logo.svg'
import ConnectWallet from './ConnectWallet.jsx'
import Menu from './Menu.jsx'

function NavBar() {
  return (
    <div className="fixed flex justify-between max-w-[1520px] w-full px-4 mt-3 lg:mt-6">
      <a href="/" rel="noopener noreferrer">
        <img src={logo} alt="Shadow Portal Logo" className="h-12" />
      </a>
      <div className="flex gap-3">
        <ConnectWallet />
        <Menu />
      </div>
    </div>
  );
}

export default NavBar


  