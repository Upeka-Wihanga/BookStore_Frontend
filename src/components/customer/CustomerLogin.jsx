import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../axios';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        // Send login request to backend using HTTP Basic Auth
        await axios.post('/login', {}, {
          auth: { username: email, password: password }
        });
        // If successful, store credentials (for demo/dev only)
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        navigate('/customer/store');
      } catch (err) {
        alert('Invalid email or password!');
      }
    } else {
      alert('Please enter email and password!');
    }
  };

  return (
    <div className="container form-section">
      <h2>Customer Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="customer-email">Email</label>
        <input
          id="customer-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label htmlFor="customer-password">Password</label>
        <input
          id="customer-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-submit" type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/customer/register">Register here</Link>
      </p>
    </div>
  );
};

export default CustomerLogin;