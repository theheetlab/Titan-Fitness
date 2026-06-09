import React, { useState, useEffect } from 'react';
import { planAPI } from '../../services/api';

const emptyForm = { title: '', price: '', duration: 'month', features: '', isPopular: false };

function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchPlans = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await planAPI.getAll();
      setPlans(res.data.data);
    } catch {
      setError('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlans(); }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setModal(true);
  };

  const openEdit = (plan) => {
    setForm({
      title: plan.title, price: String(plan.price), duration: plan.duration || 'month',
      features: plan.features.join(', '), isPopular: plan.isPopular || false
    });
    setEditing(plan._id);
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = { title: form.title, price: Number(form.price), duration: form.duration, features: form.features.split(',').map(f => f.trim()).filter(Boolean), isPopular: form.isPopular };
      if (editing) await planAPI.update(editing, data);
      else await planAPI.create(data);
      fetchPlans();
      setModal(false);
    } catch {
      setError('Failed to save plan');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this plan?')) return;
    try {
      await planAPI.delete(id);
      setPlans(plans.filter(p => p._id !== id));
    } catch {
      setError('Failed to delete plan');
    }
  };

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Membership Plans</h1>
        <button onClick={openCreate} className="btn btn-primary">+ Add Plan</button>
      </div>
      {error && <div className="admin-error" style={{ marginBottom: 16 }}>{error}</div>}
      {plans.length > 0 ? (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Features</th>
                <th>Popular</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(p => (
                <tr key={p._id}>
                  <td style={{ fontWeight: 500, color: '#222' }}>{p.title}</td>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>${p.price}</td>
                  <td style={{ textTransform: 'capitalize' }}>{p.duration || 'month'}</td>
                  <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.features.join(', ')}</td>
                  <td>{p.isPopular ? '\u2B50' : '\u2014'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => openEdit(p)} className="btn btn-edit btn-sm">Edit</button>
                      <button onClick={() => handleDelete(p._id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-table-wrapper" style={{ padding: 60, textAlign: 'center' }}>
          <p style={{ color: '#999', margin: 0 }}>No plans yet. Click "Add Plan" to create one.</p>
        </div>
      )}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editing ? 'Edit Plan' : 'Add Plan'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Basic, Pro, Elite" />
              </div>
              <div className="form-group">
                <label>Price ($) *</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} required min="0" placeholder="e.g. 29" />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <select name="duration" value={form.duration} onChange={handleChange}>
                  <option value="month">Per Month</option>
                  <option value="year">Per Year</option>
                  <option value="week">Per Week</option>
                </select>
              </div>
              <div className="form-group">
                <label>Features * (comma separated)</label>
                <textarea name="features" value={form.features} onChange={handleChange} required placeholder="Gym Access, Locker Room, Personal Training" rows={3} />
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" name="isPopular" checked={form.isPopular} onChange={handleChange} />
                  Mark as Popular / Best Value
                </label>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">{editing ? 'Update Plan' : 'Create Plan'}</button>
                <button type="button" onClick={() => setModal(false)} className="btn btn-dark">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagePlans;
