import React, { useState, useEffect } from 'react';
import { trainerAPI } from '../../services/api';

const emptyForm = { name: '', image: '', specialization: '', experience: '', bio: '' };

function ManageTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchTrainers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await trainerAPI.getAll();
      setTrainers(res.data.data);
    } catch {
      setError('Failed to load trainers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTrainers(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setModal(true);
  };

  const openEdit = (trainer) => {
    setForm({ name: trainer.name, image: trainer.image || '', specialization: trainer.specialization, experience: String(trainer.experience), bio: trainer.bio || '' });
    setEditing(trainer._id);
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = { ...form, experience: Number(form.experience) };
      if (editing) await trainerAPI.update(editing, data);
      else await trainerAPI.create(data);
      fetchTrainers();
      setModal(false);
    } catch {
      setError('Failed to save trainer');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this trainer?')) return;
    try {
      await trainerAPI.delete(id);
      setTrainers(trainers.filter(t => t._id !== id));
    } catch {
      setError('Failed to delete trainer');
    }
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Trainers</h1>
        <button onClick={openCreate} className="btn btn-primary">+ Add Trainer</button>
      </div>
      {error && <div className="admin-error" style={{ marginBottom: 16 }}>{error}</div>}
      {trainers.length > 0 ? (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map(t => (
                <tr key={t._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 500, color: '#222' }}>
                      {t.image
                        ? <img src={t.image} alt="" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }} />
                        : <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>{getInitials(t.name)}</div>
                      }
                      {t.name}
                    </div>
                  </td>
                  <td>{t.specialization}</td>
                  <td>{t.experience} years</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => openEdit(t)} className="btn btn-edit btn-sm">Edit</button>
                      <button onClick={() => handleDelete(t._id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-table-wrapper" style={{ padding: 60, textAlign: 'center' }}>
          <p style={{ color: '#999', margin: 0 }}>No trainers yet. Click "Add Trainer" to create one.</p>
        </div>
      )}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editing ? 'Edit Trainer' : 'Add Trainer'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Trainer name" />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="https://example.com/image.jpg" />
              </div>
              <div className="form-group">
                <label>Specialization *</label>
                <input type="text" name="specialization" value={form.specialization} onChange={handleChange} required placeholder="e.g. Strength & Conditioning" />
              </div>
              <div className="form-group">
                <label>Experience (years) *</label>
                <input type="number" name="experience" value={form.experience} onChange={handleChange} required min="0" placeholder="e.g. 5" />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short bio about the trainer" rows={3} />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">{editing ? 'Update Trainer' : 'Create Trainer'}</button>
                <button type="button" onClick={() => setModal(false)} className="btn btn-dark">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageTrainers;
