import React, { useState, useEffect } from 'react';
import { testimonialAPI } from '../../services/api';

const emptyForm = { name: '', image: '', review: '', rating: 5 };

function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await testimonialAPI.getAll();
      setTestimonials(res.data.data);
    } catch {
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setForm({ name: t.name, image: t.image || '', review: t.review, rating: t.rating });
    setShowModal(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing) {
        await testimonialAPI.update(editing._id, form);
      } else {
        await testimonialAPI.create(form);
      }
      setShowModal(false);
      await fetchTestimonials();
    } catch {
      setError('Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await testimonialAPI.delete(id);
      await fetchTestimonials();
    } catch {
      setError('Failed to delete testimonial');
    }
  };

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;

  return (
    <>
      <div className="admin-header">
        <h1>Manage Testimonials</h1>
        <button className="btn btn-primary" onClick={openAdd}>Add Testimonial</button>
      </div>

      {error && <div className="admin-error" style={{ marginBottom: 16 }}>{error}</div>}

      {testimonials.length === 0 ? (
        <div className="admin-table-wrapper" style={{ padding: 60, textAlign: 'center' }}>
          <p style={{ color: '#999', margin: 0 }}>No testimonials yet. Click "Add Testimonial" to create one.</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map(t => (
                <tr key={t._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 500, color: '#222' }}>
                      {t.image
                        ? <img src={t.image} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                        : <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>{t.name.split(' ').map(n => n[0]).join('')}</div>
                      }
                      {t.name}
                    </div>
                  </td>
                  <td style={{ color: 'var(--accent)', fontSize: '1rem', letterSpacing: 2 }}>{'\u2605'.repeat(t.rating)}{'\u2606'.repeat(5 - t.rating)}</td>
                  <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.review}</td>
                  <td>
                    <button className="btn btn-edit btn-sm" onClick={() => openEdit(t)} style={{ marginRight: 8 }}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Member name" />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>Rating *</label>
                <select name="rating" value={form.rating} onChange={handleChange} required>
                  {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{'★'.repeat(r)}{'☆'.repeat(5 - r)}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Review *</label>
                <textarea name="review" value={form.review} onChange={handleChange} required placeholder="Their experience at Titan Fitness..." rows={4} />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editing ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
                <button type="button" className="btn btn-dark" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageTestimonials;
