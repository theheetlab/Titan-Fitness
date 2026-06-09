import React, { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const galleryImages = [
  { id: 1, label: 'Main Gym Floor', span: true, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' },
  { id: 2, label: 'Free Weights Area', span: false, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80' },
  { id: 3, label: 'Cardio Zone', span: false, image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80' },
  { id: 4, label: 'Yoga Studio', span: false, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80' },
  { id: 5, label: 'Training Session', span: true, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80' },
  { id: 6, label: 'Locker Room', span: false, image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80' },
  { id: 7, label: 'Protein Bar', span: false, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80' }
];

function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="section" ref={ref} style={{ background: 'var(--dark-2)' }}>
      <div className="container">
        <h2 className="section-title">
          Our <span>Gallery</span>
        </h2>
        <p className="section-subtitle">
          Take a virtual tour of our premium facility.
        </p>
        <div className="gallery-grid">
          {galleryImages.map((img, i) => (
            <div
              key={img.id}
              className={`gallery-item ${img.span ? 'wide' : ''}`}
              onClick={() => setLightbox(img)}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <img src={img.image} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="gallery-overlay">
                <span>{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img
            src={lightbox.image}
            alt={lightbox.label}
            style={{
              width: '80%',
              maxWidth: 800,
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        </div>
      )}
    </section>
  );
}

export default Gallery;
