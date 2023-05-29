import React from 'react'
import "./Navbar.css"
import logo from '../imgs/logo.png'

function Navbar({connectWallet, account}) {
  return (
    <div className='Navbar'>
      <img className='logo' src={logo} alt="" />
      {account ?(
        <button className='connect-wallet'>{account.slice(0, 6) + ' ... ' + account.slice(38, 42)}</button>
      ):(
        <button className='connect-wallet' onClick={connectWallet}>Connect Wallet !</button>
      )}
    </div>
  )
}

export default Navbar