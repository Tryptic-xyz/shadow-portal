// import './NavBar.css'
import logo from './assets/shadow-logo.svg'
import ConnectWallet from './ConnectWallet.jsx'
import Menu from './Menu.jsx'

function NavBar() {
  return (
<div className="flex justify-between w-full mt-6">
  <img src={logo} alt="Shadow Portal Logo"  className="h-12" />
  <div className="flex gap-3">
    <ConnectWallet     />
    <Menu />
  </div>
</div>
  )
}

export default NavBar


  