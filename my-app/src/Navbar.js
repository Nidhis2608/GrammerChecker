import React from 'react';
import Logo from "./GCLogo.svg"; // Ensure the file path is correct

const Navbar = () => {
  return (
    <>
    <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark" style={{ position: 'relative', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Logo with specific positioning */}
      <img src={Logo} alt="Grammar Checker Logo" height="60" width="150" style={{ position: 'absolute', left: '100px' }}/>
      {/* Centered title */}
      <h1 style={{ fontSize: '50px', color:"#1B4242"}}>Grammar Checker</h1>

    </nav>

      {/* <nav className="navbar bg-primary" data-bs-theme="dark">
      Grammer Checker
      </nav> */}

      <nav className="navbar" style={{ backgroundColor: '#e3f2fd' }}>
        {/* Navbar content */}
      </nav>
    </>
  );
};

export default Navbar;
