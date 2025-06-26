import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminPassword');
    navigate('/');
  };

  return (
    <div className="nav-wrapper">
      <nav>
        <NavLink to="/admin/books" className={({ isActive }) => isActive ? 'active' : ''}>Books</NavLink>
        <NavLink to="/admin/add" className={({ isActive }) => isActive ? 'active' : ''}>Add Book</NavLink>
        <button className="btn btn-delete" style={{ marginLeft: 24 }} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminNav;