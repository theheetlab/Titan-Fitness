import React, { useState, useEffect } from 'react';
import { contactAPI } from '../../services/api';

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await contactAPI.getAll();
      setContacts(res.data.data);
    } catch {
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    try {
      await contactAPI.delete(id);
      setContacts(contacts.filter(c => c._id !== id));
    } catch {
      setError('Failed to delete contact');
    }
  };

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Contacts</h1>
        <div className="header-actions">
          <span style={{ color: '#888', fontSize: '0.9rem', background: 'white', padding: '6px 14px', borderRadius: 8, border: '1px solid #eef0f2' }}>{contacts.length} total</span>
        </div>
      </div>
      {error && <div className="admin-error" style={{ marginBottom: 16 }}>{error}</div>}
      {contacts.length > 0 ? (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c._id}>
                  <td style={{ fontWeight: 500, color: '#222' }}>{c.name}</td>
                  <td><a href={`mailto:${c.email}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>{c.email}</a></td>
                  <td>{c.phone}</td>
                  <td style={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleDelete(c._id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-table-wrapper" style={{ padding: 60, textAlign: 'center' }}>
          <p style={{ color: '#999', margin: 0 }}>No contact submissions yet.</p>
        </div>
      )}
    </div>
  );
}

export default AdminContacts;
