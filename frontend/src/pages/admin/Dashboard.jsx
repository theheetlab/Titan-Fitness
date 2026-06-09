import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contactAPI, trainerAPI, planAPI, testimonialAPI } from '../../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState({ contacts: 0, trainers: 0, plans: 0, testimonials: 0 });
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [contacts, trainers, plans, testimonials] = await Promise.all([
          contactAPI.getAll(),
          trainerAPI.getAll(),
          planAPI.getAll(),
          testimonialAPI.getAll()
        ]);
        setStats({
          contacts: contacts.data.count,
          trainers: trainers.data.count,
          plans: plans.data.count,
          testimonials: testimonials.data.count
        });
        setRecentContacts(contacts.data.data.slice(0, 5));
      } catch {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard</h1>
      </div>
      {error && <div className="admin-error" style={{ marginBottom: 16 }}>{error}</div>}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="stat-icon contacts">{'\u2709'}</div>
          <h3>Total Contacts</h3>
          <div className="number">{stats.contacts}</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon trainers">{'\uD83D\uDCAA'}</div>
          <h3>Trainers</h3>
          <div className="number">{stats.trainers}</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon plans">{'\uD83D\uDCCB'}</div>
          <h3>Membership Plans</h3>
          <div className="number">{stats.plans}</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon testimonials">{'\u2B50'}</div>
          <h3>Testimonials</h3>
          <div className="number">{stats.testimonials}</div>
        </div>
      </div>
      <div className="admin-table-wrapper">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #eef0f2' }}>
          <h3 style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-dark)', fontSize: '1.1rem', margin: 0 }}>
            Recent Contacts
          </h3>
          <Link to="/admin/contacts" className="btn btn-primary btn-sm">View All</Link>
        </div>
        {recentContacts.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentContacts.map(c => (
                <tr key={c._id}>
                  <td style={{ fontWeight: 500, color: '#222' }}>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#999', textAlign: 'center', padding: 40 }}>No contacts yet.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
