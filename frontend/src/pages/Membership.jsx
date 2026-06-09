import React, { useState, useEffect } from 'react';
import { planAPI } from '../services/api';

const fallbackPlans = [
  {
    _id: '1', title: 'Basic', price: 29, duration: 'month',
    features: ['Gym Access (6am-8pm)', 'Locker Room Access', 'Basic Equipment', '1 Free Trainer Session', 'Locker Rental']
  },
  {
    _id: '2', title: 'Pro', price: 59, duration: 'month', isPopular: true,
    features: ['Gym Access (All Hours)', 'Locker Room Access', 'Basic Equipment', 'Unlimited Group Classes', '2 Personal Trainer Sessions/Month', 'Custom Nutrition Plan', 'Progress Tracking App', '2 Guest Passes/Month']
  },
  {
    _id: '3', title: 'Elite', price: 99, duration: 'month',
    features: ['Gym Access (All Hours)', 'Locker Room Access', 'Basic Equipment', 'Unlimited Group Classes', 'Unlimited PT Sessions', 'Custom Nutrition Plan', 'Progress Tracking App', 'Yoga & Wellness Program', 'Recovery Zone Access', 'Priority Class Booking', '4 Guest Passes/Month', 'Protein Bar Discount']
  }
];

const comparisonFeatures = [
  'Gym Access', 'Locker Room', 'Basic Equipment', 'Group Classes',
  'Personal Training', 'Nutrition Plan', 'Progress Tracking',
  'Yoga & Wellness', 'Recovery Zone', 'Guest Passes'
];

const planFeatureMap = {
  '1': ['Gym Access', 'Locker Room', 'Basic Equipment'],
  '2': ['Gym Access', 'Locker Room', 'Basic Equipment', 'Group Classes', 'Personal Training', 'Nutrition Plan', 'Progress Tracking', 'Guest Passes'],
  '3': ['Gym Access', 'Locker Room', 'Basic Equipment', 'Group Classes', 'Personal Training', 'Nutrition Plan', 'Progress Tracking', 'Yoga & Wellness', 'Recovery Zone', 'Guest Passes']
};

function Membership() {
  const [plans, setPlans] = useState(fallbackPlans);

  useEffect(() => {
    planAPI.getAll()
      .then(res => setPlans(res.data.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="about-hero">
        <div className="container">
          <h1>Membership <span>Plans</span></h1>
          <p>Invest in yourself. Choose the plan that fits your lifestyle.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="plans-grid">
            {plans.map((plan, i) => (
              <div key={plan._id} className={`plan-card ${plan.isPopular ? 'popular' : ''}`}>
                {plan.isPopular && <div className="plan-badge">Best Value</div>}
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
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Join {plan.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--dark-2)' }}>
        <div className="container">
          <h2 className="section-title">Plan <span>Comparison</span></h2>
          <p className="section-subtitle">See exactly what each plan offers.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%', minWidth: 600, borderCollapse: 'collapse',
              background: 'var(--dark-3)', borderRadius: 'var(--radius-sm)',
              overflow: 'hidden', boxShadow: 'var(--shadow-sm)'
            }}>
              <thead>
                <tr>
                  <th style={{
                    padding: 16, textAlign: 'left', fontSize: '0.85rem',
                    textTransform: 'uppercase', letterSpacing: 1,
                    background: 'var(--dark)', color: 'white'
                  }}>Feature</th>
                  {plans.map(p => (
                    <th key={p._id} style={{
                      padding: 16, textAlign: 'center', fontSize: '0.85rem',
                      textTransform: 'uppercase', letterSpacing: 1,
                      background: 'var(--dark)', color: 'white'
                    }}>{p.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', fontWeight: 500, color: 'var(--text)' }}>{feature}</td>
                    {plans.map(plan => {
                      const included = planFeatureMap[plan._id]?.includes(feature);
                      return (
                        <td key={plan._id} style={{
                          padding: '14px 16px', borderBottom: '1px solid var(--border)',
                          textAlign: 'center', fontSize: '1.2rem',
                          color: included ? 'var(--primary)' : 'var(--text-muted)'
                        }}>
                          {included ? '✓' : '✗'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default Membership;
