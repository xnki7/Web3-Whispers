import React from 'react'
import "./Navbar.css"

function Navbar({connectWallet}) {
  return (
    <div className='Navbar'>
        <h1>Wagmi🔰Logs</h1>
        <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  )
}

export default Navbar