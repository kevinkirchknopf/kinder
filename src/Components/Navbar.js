import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import profileIcon from '../images/profile_icon.png';
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const userMenuRef = useRef();


  const handleProfileEdit = () => {
    navigate('/profile'); // Átirányítás
    setIsDropdownOpen(false);
  };



  const handleMessages = () => {
    console.log("Üzenetek");
    setIsDropdownOpen(false);
  };



  const handleLogout = () => {
    console.log("Kijelentkezés");
    setIsDropdownOpen(false);
    onLogout();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="user-menu" ref={userMenuRef}>
          <button 
            className="user-icon" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img src={profileIcon} alt="Profil ikon" id="profilkep"/>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleProfileEdit}>Profil Szerkesztése</button>
              <button onClick={handleMessages}>Üzenetek</button>
              <button onClick={handleLogout}>Kijelentkezés</button>
            </div>
          )}
        </div>
>>>>>>> 06b47764f60961b2db9ae4a2ff1a8f2022d93ce8
  );
};

export default Navbar;