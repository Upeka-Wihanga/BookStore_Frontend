import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <div className="container">
    <h2>Admin Dashboard</h2>
    <nav>
      <Link to="/admin/books">Manage Books</Link> |{' '}
      <Link to="/admin/add">Add Book</Link>
    </nav>
    <p>(Admin features coming soon...)</p>
  </div>
);

export default AdminDashboard;