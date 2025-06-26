import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/login', {}, {
        auth: { username, password }
      });
      localStorage.setItem('adminEmail', username);
      localStorage.setItem('adminPassword', password);
      navigate('/admin/books');
    } catch (err) {
      alert('Invalid admin credentials!');
    }
  };

  return (
    <div className="container form-section">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="admin-username">Username</label>
        <input
          id="admin-username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-submit" type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;