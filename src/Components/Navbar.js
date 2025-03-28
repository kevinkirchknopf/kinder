import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/mainScreen">Kinder</Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <div
          className={`nav-links ${isMenuOpen ? "open" : ""}`}
          ref={menuRef}
        >
          <Link to="/mainScreen" className="nav-item" onClick={() => setIsMenuOpen(false)}>
            Főoldal
          </Link>
          <Link to="/profile" className="nav-item" onClick={() => setIsMenuOpen(false)}>
            Profil
          </Link>
          <Link to="/messages" className="nav-item" onClick={() => setIsMenuOpen(false)}>
            Üzenetek
          </Link>
          <button
            onClick={() => {
              onLogout();
              setIsMenuOpen(false);
            }}
            className="nav-item logout-button"
          >
            Kijelentkezés
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;