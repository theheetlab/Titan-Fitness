import React, { useState } from 'react';
import { contactAPI } from '../services/api';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await contactAPI.submit(form);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="about-hero">
        <div className="container">
          <h1>Contact <span>Us</span></h1>
          <p>Have questions? We would love to hear from you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'start'
          }}>
            <div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 16 }}>
                Get In <span style={{ color: 'var(--primary)' }}>Touch</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.8 }}>
                Ready to start your fitness journey? Visit us, call us, or send a message.
                Our team is here to help you every step of the way.
              </p>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--primary)' }}>📍 Address</div>
                <div style={{ color: 'var(--text-muted)' }}>123 Fitness Street, Gym City, GC 10001</div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--primary)' }}>📞 Phone</div>
                <div style={{ color: 'var(--text-muted)' }}>+1 (555) 123-4567</div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--primary)' }}>✉️ Email</div>
                <div style={{ color: 'var(--text-muted)' }}>info@titanfitness.com</div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--primary)' }}>🕐 Hours</div>
                <div style={{ color: 'var(--text-muted)' }}>Mon - Sun: 5:00 AM - 11:00 PM</div>
              </div>
            </div>

            <div style={{
              background: 'var(--dark-3)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: 40
            }}>
              {!submitted ? (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="form-group">
                    <label>Your Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Tell us about your fitness goals, questions, or how we can help..." />
                  </div>
                  {error && (
                    <div style={{ color: '#e63946', marginBottom: 16, padding: 12, background: 'rgba(230,57,70,0.1)', borderRadius: 8, fontSize: '0.9rem' }}>
                      {error}
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary btn-lg form-submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              ) : (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
