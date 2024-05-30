import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className={`overlay ${menuOpen ? 'open' : ''}`} onClick={handleMenuToggle}></div>
      <nav className="navbar">
        <div className="menu-icon" onClick={handleMenuToggle}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </div>
        <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" onClick={handleLinkClick}>
              PythMatic
            </Link>
          </li>
          <li>
            <Link to="/games" onClick={handleLinkClick}>
              Games
            </Link>
          </li>
          <li>
            <Link to="/calculator" onClick={handleLinkClick}>
              Calculator
            </Link>
          </li>
          <li>
            <Link to="/compiler" onClick={handleLinkClick}>
              Compiler
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
