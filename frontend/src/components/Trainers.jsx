import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trainerAPI } from '../services/api';
import useScrollAnimation from '../hooks/useScrollAnimation';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [ref, isVisible] = useScrollAnimation();

  useEffect(() => {
    trainerAPI.getAll()
      .then(res => setTrainers(res.data.data))
      .catch(() => {
        setTrainers([
          { _id: '1', name: 'John Smith', specialization: 'Strength & Conditioning', experience: 8, image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop&crop=face' },
          { _id: '2', name: 'Sarah Johnson', specialization: 'Yoga & Flexibility', experience: 6, image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop&crop=face' },
          { _id: '3', name: 'Mike Williams', specialization: 'Bodybuilding', experience: 10, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=400&fit=crop&crop=face' },
          { _id: '4', name: 'Emily Davis', specialization: 'HIIT & Cardio', experience: 5, image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face' }
        ]);
      });
  }, []);

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  return (
    <section className="section" ref={ref}>
      <div className="container">
        <h2 className="section-title">
          Meet Our <span>Trainers</span>
        </h2>
        <p className="section-subtitle">
          Our certified trainers are dedicated to helping you achieve your fitness goals.
        </p>
        <div className="trainers-grid">
          {trainers.map((t, i) => (
            <div key={t._id} className="trainer-card" style={{ transitionDelay: `${i * 0.1}s` }}>
              {t.image ? (
                <img src={t.image} alt={t.name} className="trainer-image" />
              ) : (
                <div style={{
                  width: '100%',
                  height: 300,
                  background: 'linear-gradient(135deg, var(--dark-3), var(--dark-4))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  fontFamily: "'Oswald', sans-serif",
                  color: 'var(--primary)'
                }}>
                  {getInitials(t.name)}
                </div>
              )}
              <div className="trainer-info">
                <h3 className="trainer-name">{t.name}</h3>
                <p className="trainer-specialization">{t.specialization}</p>
                <p className="trainer-experience">{t.experience} years experience</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/trainers" className="btn btn-primary">View All Trainers</Link>
        </div>
      </div>
    </section>
  );
}

export default Trainers;
