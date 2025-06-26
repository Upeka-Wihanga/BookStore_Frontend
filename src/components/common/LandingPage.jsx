import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ marginTop: 60, textAlign: 'center' }}>
      <h2>Welcome to Book Store</h2>
      <p>Are you a customer or an admin?</p>
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 32 }}>
        <button className="btn btn-update" onClick={() => navigate('/customer/store')}>
          I'm a Customer
        </button>
        <button className="btn btn-delete" onClick={() => navigate('/admin/login')}>
          I'm an Admin
        </button>
      </div>
    </div>
  );
};

export default LandingPage;