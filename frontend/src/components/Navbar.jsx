import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="navbar-logo-icon">TF</div>
          <span className="navbar-logo-text">Titan <span>Fitness</span></span>
        </Link>

        <button
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" className="navbar-link" onClick={closeMenu} end>Home</NavLink>
          <NavLink to="/about" className="navbar-link" onClick={closeMenu}>About</NavLink>
          <NavLink to="/membership" className="navbar-link" onClick={closeMenu}>Membership</NavLink>
          <NavLink to="/trainers" className="navbar-link" onClick={closeMenu}>Trainers</NavLink>
          <NavLink to="/gallery" className="navbar-link" onClick={closeMenu}>Gallery</NavLink>
          <NavLink to="/contact" className="navbar-link" onClick={closeMenu}>Contact</NavLink>
          <div className="navbar-cta">
            <Link to="/membership" className="btn btn-primary" onClick={closeMenu}>
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
