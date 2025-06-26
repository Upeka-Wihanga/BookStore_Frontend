import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import LandingPage from './components/common/LandingPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import BookList from './components/admin/BookList';
import AddBook from './components/admin/AddBook';
import UpdateBook from './components/admin/UpdateBook';
import Store from './components/customer/Store';
import Cart from './components/customer/Cart';
import Wishlist from './components/customer/Wishlist';
import CustomerRegister from './components/customer/CustomerRegister';
import CustomerLogin from './components/customer/CustomerLogin';
import AdminNav from './components/admin/AdminNav';

function AdminNavWrapper() {
  const location = useLocation();
  // Show nav on all /admin routes except /admin/login
  if (location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
    return <AdminNav />;
  }
  return null;
}

function App() {
  return (
    <>
      <div className="header">Book Store</div>
      <Router>
        <AdminNavWrapper />
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/books" element={<BookList />} />
          <Route path="/admin/add" element={<AddBook />} />
          <Route path="/admin/edit/:id" element={<UpdateBook />} />

          {/* Customer routes */}
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/store" element={<Store />} />
          <Route path="/customer/cart" element={<Cart />} />
          <Route path="/customer/wishlist" element={<Wishlist />} />
          <Route path="/customer/register" element={<CustomerRegister />} />
        </Routes>
      </Router>
      <footer style={{
        marginTop: 40,
        padding: '18px 0',
        background: '#f1f5f9',
        color: '#4a5568',
        fontSize: '1rem',
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0'
      }}>
        © {new Date().getFullYear()} Book Store. All rights reserved.
      </footer>
    </>
  );
}

export default App;
