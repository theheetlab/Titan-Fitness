import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const features = [
  {
    icon: '🏋️',
    title: 'Modern Equipment',
    desc: 'State-of-the-art machines and free weights from top brands for the ultimate training experience.'
  },
  {
    icon: '👨‍🏫',
    title: 'Expert Trainers',
    desc: 'Certified professionals with years of experience to guide you every step of the way.'
  },
  {
    icon: '📋',
    title: 'Custom Programs',
    desc: 'Personalized workout plans tailored to your goals, fitness level, and schedule.'
  },
  {
    icon: '🧘',
    title: 'Yoga & Wellness',
    desc: 'Mind-body programs including yoga, meditation, and recovery sessions.'
  },
  {
    icon: '👥',
    title: 'Group Classes',
    desc: 'High-energy group sessions that make fitness fun, social, and motivating.'
  },
  {
    icon: '🚿',
    title: 'Premium Amenities',
    desc: 'Clean locker rooms, steam baths, protein bar, and recovery zones.'
  }
];

function WhyChooseUs() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="section why-choose" ref={ref}>
      <div className="container">
        <h2 className="section-title">
          Why Choose <span>Titan</span>
        </h2>
        <p className="section-subtitle">
          We provide everything you need to reach your fitness goals in a motivating environment.
        </p>
        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
