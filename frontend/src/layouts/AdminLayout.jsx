import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: '\u2302' },
  { path: '/admin/contacts', label: 'Contacts', icon: '\u2709' },
  { path: '/admin/trainers', label: 'Trainers', icon: '\uD83D\uDCAA' },
  { path: '/admin/plans', label: 'Membership Plans', icon: '\uD83D\uDCCB' },
  { path: '/admin/testimonials', label: 'Testimonials', icon: '\u2B50' },
];

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    authAPI.verify()
      .then((res) => setAdmin(res.data.admin))
      .catch(() => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="loading-spinner" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <button className="admin-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}
      <nav className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="admin-sidebar-logo">
          <div className="logo-icon">TF</div>
          <div>Titan <span>Fitness</span></div>
        </div>
        <div className="admin-sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
        <button onClick={handleLogout} className="admin-nav-item logout">
          <span className="nav-icon">{'\u2192'}</span>
          Logout
        </button>
      </nav>
      <div className="admin-main">
        <Outlet context={{ admin }} />
      </div>
    </div>
  );
}

export default AdminLayout;
