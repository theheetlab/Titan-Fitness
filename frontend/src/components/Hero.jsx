import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80" alt="Titan Fitness Gym" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="hero-overlay" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">⚡ Premium Fitness Since 2024</div>
          <h1 className="hero-title">
            Transform Your
            <span>Body & Mind</span>
          </h1>
          <p className="hero-description">
            Join Titan Fitness and unlock your full potential. World-class equipment, expert trainers, and a community that pushes you to be your best.
          </p>
          <div className="hero-buttons">
            <Link to="/membership" className="btn btn-primary btn-lg">
              Get Started Today
            </Link>
            <Link to="/about" className="btn btn-outline btn-lg">
              Learn More
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Active Members</div>
            </div>
            <div>
              <div className="hero-stat-number">15+</div>
              <div className="hero-stat-label">Expert Trainers</div>
            </div>
            <div>
              <div className="hero-stat-number">98%</div>
              <div className="hero-stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80"
            alt="Personal Training at Titan Fitness"
            style={{
              width: '100%',
              aspectRatio: '4/5',
              borderRadius: '20px',
              objectFit: 'cover'
            }}
          />
          <div className="hero-image-accent">
            <strong>100+</strong>
            <span>Equipment</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
