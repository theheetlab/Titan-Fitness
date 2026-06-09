import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { planAPI } from '../services/api';
import useScrollAnimation from '../hooks/useScrollAnimation';

function MembershipPlans() {
  const [ref, isVisible] = useScrollAnimation();
  const [plans, setPlans] = useState([
    { _id: '1', title: 'Basic', price: 29, features: ['Gym Access (6am-8pm)', 'Locker Room', 'Basic Equipment', '1 Free Trainer Session'], duration: 'month' },
    { _id: '2', title: 'Pro', price: 59, features: ['Gym Access (All Hours)', 'Locker Room', 'Basic Equipment', 'Unlimited Group Classes', 'Personal Trainer Sessions', 'Nutrition Plan', 'Progress Tracking'], duration: 'month', isPopular: true },
    { _id: '3', title: 'Elite', price: 99, features: ['Gym Access (All Hours)', 'Locker Room', 'Basic Equipment', 'Unlimited Group Classes', 'Unlimited PT Sessions', 'Nutrition Plan', 'Progress Tracking', 'Yoga & Wellness', 'Recovery Zone', 'Guest Passes'], duration: 'month' }
  ]);

  useEffect(() => {
    planAPI.getAll()
      .then(res => setPlans(res.data.data))
      .catch(() => {});
  }, []);

  return (
    <section className="section" ref={ref} style={{ background: 'var(--dark-2)' }}>
      <div className="container">
        <h2 className="section-title">
          Membership <span>Plans</span>
        </h2>
        <p className="section-subtitle">
          Choose the perfect plan that fits your fitness journey.
        </p>
        <div className="plans-grid">
          {plans.map((plan, i) => (
            <div
              key={plan._id}
              className={`plan-card ${plan.isPopular ? 'popular' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {plan.isPopular && <div className="plan-badge">Most Popular</div>}
              <h3 className="plan-name">{plan.title}</h3>
              <div className="plan-price">
                <span className="currency">$</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/{plan.duration || 'month'}</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="plan-feature">
                    <span className="check">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/membership" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MembershipPlans;
