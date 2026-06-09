import React, { useState } from 'react';
import { contactAPI } from '../services/api';

function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
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
    <section className="contact-cta">
      <div className="container">
        {!submitted ? (
          <>
            <h2>Ready to <span>Transform?</span></h2>
            <p>Get in touch with us and start your fitness journey today.</p>
            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="form-group">
                    <label>Interested In</label>
                    <select>
                      <option>Membership</option>
                      <option>Personal Training</option>
                      <option>Group Classes</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Tell us about your fitness goals..." />
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
            </div>
          </>
        ) : (
          <div className="form-success">
            <div className="success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>Your message has been received. We will get back to you shortly.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ContactCTA;
