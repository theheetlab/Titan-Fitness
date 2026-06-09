import React, { useState, useEffect } from 'react';
import { trainerAPI } from '../services/api';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    trainerAPI.getAll()
      .then(res => setTrainers(res.data.data))
      .catch(() => {
        setTrainers([
          { _id: '1', name: 'John Smith', specialization: 'Strength & Conditioning', experience: 8, image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop&crop=face', bio: 'John is a certified strength and conditioning specialist with a passion for helping athletes reach their peak performance.' },
          { _id: '2', name: 'Sarah Johnson', specialization: 'Yoga & Flexibility', experience: 6, image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop&crop=face', bio: 'Sarah brings peace and strength together. Her yoga sessions are designed to improve flexibility, balance, and mental clarity.' },
          { _id: '3', name: 'Mike Williams', specialization: 'Bodybuilding', experience: 10, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=400&fit=crop&crop=face', bio: 'With a decade of bodybuilding experience, Mike knows exactly how to sculpt and transform physiques.' },
          { _id: '4', name: 'Emily Davis', specialization: 'HIIT & Cardio', experience: 5, image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face', bio: 'Emily high-energy HIIT classes are legendary. She will push you beyond your limits and make you love every minute.' },
          { _id: '5', name: 'Robert Chen', specialization: 'Nutrition & Weight Loss', experience: 7, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', bio: 'Robert combines exercise science with nutrition expertise to create holistic transformation programs.' },
          { _id: '6', name: 'Lisa Anderson', specialization: 'Pilates & Rehab', experience: 9, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face', bio: 'Lisa specializes in rehabilitative fitness and pilates, helping members recover and build core strength.' }
        ]);
      });
  }, []);

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  return (
    <>
      <section className="about-hero">
        <div className="container">
          <h1>Our <span>Trainers</span></h1>
          <p>Meet the experts who will guide you every step of the way.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="trainers-grid">
            {trainers.map((t, i) => (
              <div
                key={t._id}
                className="trainer-card"
                onClick={() => setSelected(t)}
                style={{ cursor: 'pointer' }}
              >
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
        </div>
      </section>

      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)} style={{ cursor: 'pointer' }}>
          <button className="lightbox-close" onClick={() => setSelected(null)}>✕</button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--dark-3)',
              borderRadius: 'var(--radius-md)',
              padding: 40,
              maxWidth: 500,
              width: '100%',
              border: '1px solid var(--border)'
            }}
          >
            {selected.image ? (
              <img src={selected.image} alt={selected.name} style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 20px', display: 'block' }} />
            ) : (
              <div style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                fontFamily: "'Oswald', sans-serif",
                margin: '0 auto 20px'
              }}>
                {getInitials(selected.name)}
              </div>
            )}
            <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '1.5rem', textAlign: 'center', marginBottom: 4 }}>{selected.name}</h3>
            <p style={{ color: 'var(--primary)', textAlign: 'center', marginBottom: 8 }}>{selected.specialization}</p>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: 20 }}>{selected.experience} years experience</p>
            {selected.bio && (
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, textAlign: 'center' }}>{selected.bio}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Trainers;
