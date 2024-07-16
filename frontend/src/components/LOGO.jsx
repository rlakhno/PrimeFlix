import React, { useState } from 'react';
import '../App.css';

const Logo = () => {
  const [logoSrc, setLogoSrc] = useState('./images/PF_LOGO.png');

  const handleMouseEnter = () => {
    setLogoSrc('./images/PF_LOGO.gif');
  };

  const handleMouseLeave = () => {
    setLogoSrc('./images/PF_LOGO.jpg');
  };

  return (
    <div className="logo-container">
      <img
        src={logoSrc}
        alt="Logo"
        className="logo"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default Logo;
