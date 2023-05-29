import React from 'react'
import "./Navbar.css"
import logo from '../imgs/logo.png'

function Navbar({connectWallet}) {
  return (
    <div className='Navbar'>
        <img className='logo' src={logo} alt="" />
        <button className='connect-wallet' onClick={connectWallet}>Connect Wallet</button>
    </div>
  )
}

export default Navbar