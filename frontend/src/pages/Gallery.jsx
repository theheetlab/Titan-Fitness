import React, { useState } from 'react';

const galleryImages = [
  { id: 1, label: 'Main Gym Floor - Cardio Zone', span: true, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' },
  { id: 2, label: 'Free Weights Section', span: false, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80' },
  { id: 3, label: 'Functional Training Area', span: false, image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80' },
  { id: 4, label: 'Yoga & Pilates Studio', span: false, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80' },
  { id: 5, label: 'Intense Training Session', span: true, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80' },
  { id: 6, label: 'Premium Locker Room', span: false, image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80' },
  { id: 7, label: 'Protein Bar & Nutrition', span: false, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80' },
  { id: 8, label: 'Group Class in Action', span: false, image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600&q=80' },
  { id: 9, label: 'Recovery & Wellness Zone', span: true, image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&q=80' },
  { id: 10, label: 'Boxing & MMA Area', span: false, image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&q=80' },
  { id: 11, label: 'Cycling Studio', span: false, image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=80' },
  { id: 12, label: 'Trainer Guidance', span: false, image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80' }
];

function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <section className="about-hero">
        <div className="container">
          <h1>Our <span>Gallery</span></h1>
          <p>Experience Titan Fitness through our premium facility tour.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {galleryImages.map((img, i) => (
              <div
                key={img.id}
                className={`gallery-item ${img.span ? 'wide' : ''}`}
                onClick={() => setLightbox(img)}
                style={{ cursor: 'pointer' }}
              >
                <img src={img.image} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="gallery-overlay">
                  <span>{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img
            src={lightbox.image}
            alt={lightbox.label}
            style={{
              width: '80%',
              maxWidth: 900,
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        </div>
      )}
    </>
  );
}

export default Gallery;
