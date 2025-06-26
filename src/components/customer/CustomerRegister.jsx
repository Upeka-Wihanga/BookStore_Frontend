import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

const CustomerRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        await axios.post('/register', { email, password });
        alert('Registration successful! Please log in.');
        navigate('/customer/login');
      } catch (err) {
        alert('Registration failed: ' + (err.response?.data || 'Unknown error'));
      }
    } else {
      alert('Please enter email and password!');
    }
  };

  return (
    <div className="container form-section">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-submit" type="submit">Register</button>
      </form>
    </div>
  );
};

export default CustomerRegister;