import React from 'react';
import Logo from '../assets/icon-white.png';
import '../Styles/Components/_headerAuth.scss'

export default function Header() {
  return (
    <div className="container-header">
      <div className="container-img">
        <img src={Logo} alt="Logo Groupomania" />
      </div>
    </div>
    
  )
}
