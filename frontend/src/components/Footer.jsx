import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="navbar-logo">
              <div className="navbar-logo-icon">TF</div>
              <span className="navbar-logo-text">Titan <span>Fitness</span></span>
            </div>
            <p>
              Transform your body, transform your life. Titan Fitness is more than a gym — it's a community dedicated to helping you achieve your best self.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/membership">Membership</Link></li>
              <li><Link to="/trainers">Trainers</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Membership</h4>
            <ul className="footer-links">
              <li><Link to="/membership">Basic Plan</Link></li>
              <li><Link to="/membership">Pro Plan</Link></li>
              <li><Link to="/membership">Elite Plan</Link></li>
              <li><Link to="/membership">Compare Plans</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <span className="icon">📍</span>
                <span>123 Fitness Street, Gym City, GC 10001</span>
              </li>
              <li>
                <span className="icon">📞</span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <span className="icon">✉️</span>
                <span>info@titanfitness.com</span>
              </li>
              <li>
                <span className="icon">🕐</span>
                <span>Mon - Sun: 5:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Titan Fitness. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/admin" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', opacity: 0.5 }}>Admin</Link>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Twitter">TW</a>
              <a href="#" aria-label="YouTube">YT</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
