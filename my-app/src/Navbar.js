import React from 'react';
import Logo from "./GCLogo.svg"; // Ensure the file path is correct
import "./Navbar.css"

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-dark border-bottom border-body" style={{ position: 'relative', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={Logo} alt="Grammar Checker Logo" className="navbar-logo" />
        <h1 className="navbar-title">Grammar Checker</h1>
      </nav>

      <nav className="navbar" style={{ backgroundColor: '#e3f2fd' }}>
        {/* Additional Navbar content can be added here */}
      </nav>
    </>
  );
};

export default Navbar;