import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--dark)', textAlign: 'center', padding: 40
    }}>
      <div>
        <div style={{
          fontFamily: "'Oswald', sans-serif", fontSize: '10rem', fontWeight: 700,
          color: 'var(--primary)', lineHeight: 1, marginBottom: 16
        }}>404</div>
        <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '2rem', textTransform: 'uppercase', marginBottom: 12 }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
