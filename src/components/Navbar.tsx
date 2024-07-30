import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

interface User {
  id: string;
  username: string;
  email: string;
}

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

function Navbar({ user, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
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
              Home
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
          {user ? (
            <>
              <li
                className="account-menu"
                onMouseEnter={handleDropdownToggle}
                onMouseLeave={handleDropdownToggle}
              >
                <Link to="/account" onClick={handleLinkClick}>
                  Account
                </Link>
                <ul className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
                  <li>
                    <button id='logout' style={{background:'none', border:'none', boxShadow:'none', fontSize:'1.5rem'}} onClick={onLogout}>
                      <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                  </li>
                  <li>
                    <Link to="/" >
                      Account Settings
                    </Link>
                  </li>
                  <li>
                    <Link to="/" >
                      Help and Support
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={handleLinkClick}>
                  Login
                </Link>
                <span style={{ padding: '20px' }}>/</span>
                <Link to="/register" onClick={handleLinkClick}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
