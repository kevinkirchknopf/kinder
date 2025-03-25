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

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/mainScreen" className="nav-item">Főoldal</Link>
        <Link to="/profile" className="nav-item">Profil</Link>
        <Link to="/messages" className="nav-item">Üzenetek</Link>
        <button onClick={onLogout} className="nav-item logout-button">
          Kijelentkezés
        </button>
      </div>
    </nav>
  );
};

export default Navbar;