import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

function About() {
  const [storyRef, storyVisible] = useScrollAnimation();
  const [mvRef, mvVisible] = useScrollAnimation();

  return (
    <>
      <section className="about-hero">
        <div className="container">
          <h1>About <span>Titan Fitness</span></h1>
          <p>Building stronger bodies and minds since 2024.</p>
        </div>
      </section>

      <section className="about-story" ref={storyRef}>
        <div className="container">
          <div className="about-story-image">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
              alt="Titan Fitness Gym Interior"
              style={{ width: '100%', aspectRatio: '4/3', borderRadius: '20px', objectFit: 'cover' }}
            />
          </div>
          <div className="about-story-content">
            <h2>Our <span>Story</span></h2>
            <p>
              Titan Fitness was born from a simple belief: everyone deserves access to premium fitness facilities and expert guidance. What started as a small training studio has grown into one of the most respected fitness centers in the city.
            </p>
            <p>
              Our founders, fitness enthusiasts with decades of combined experience, envisioned a gym where cutting-edge equipment meets genuine community support. Today, Titan Fitness stands as a testament to that vision — a place where beginners and professionals alike can pursue their fitness goals.
            </p>
            <p>
              We are not just a gym. We are a family. We celebrate every milestone, push through every plateau, and transform lives one workout at a time.
            </p>
          </div>
        </div>
      </section>

      <section className="mission-vision" ref={mvRef}>
        <div className="container">
          <div className="mv-card">
            <div className="mv-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To empower individuals to achieve their peak physical and mental potential through world-class fitness facilities, expert guidance, and a supportive community that inspires lasting transformation.
            </p>
          </div>
          <div className="mv-card">
            <div className="mv-icon">🔭</div>
            <h3>Our Vision</h3>
            <p>
              To become the most trusted and transformative fitness brand globally — setting the standard for excellence in health, wellness, and community-driven fitness experiences.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
