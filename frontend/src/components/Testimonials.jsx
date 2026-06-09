import React, { useState, useEffect } from 'react';
import { testimonialAPI } from '../services/api';
import useScrollAnimation from '../hooks/useScrollAnimation';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [ref, isVisible] = useScrollAnimation();

  useEffect(() => {
    testimonialAPI.getAll()
      .then(res => setTestimonials(res.data.data))
      .catch(() => {
        setTestimonials([
          { _id: '1', name: 'Alex Johnson', review: 'Titan Fitness completely transformed my life. The trainers are incredibly knowledgeable and the community is so supportive. I have never been stronger or more confident.', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
          { _id: '2', name: 'Maria Garcia', review: 'The best gym I have ever been to. The equipment is top-notch and the group classes are amazing. I look forward to every workout!', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
          { _id: '3', name: 'David Chen', review: 'After trying many gyms, Titan is by far the best. The personalized training programs helped me achieve results I never thought possible.', rating: 5, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' }
        ]);
      });
  }, []);

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  return (
    <section className="section" ref={ref}>
      <div className="container">
        <h2 className="section-title">
          What Our <span>Members Say</span>
        </h2>
        <p className="section-subtitle">
          Hear from our community of fitness enthusiasts who transformed their lives at Titan.
        </p>
        <div className="testimonials-slider">
          {testimonials.map((t, i) => (
            <div key={t._id} className="testimonial-card" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="testimonial-stars">
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </div>
              <p className="testimonial-review">"{t.review}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.image ? (
                    <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : getInitials(t.name)}
                </div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">Titan Member</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
