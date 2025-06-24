import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';

function App() {
  return (
    <>
      <div className="header">Book Store</div>
      <Router>
        <div className="nav-wrapper">
          <nav>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Books</NavLink>
            <NavLink to="/add" className={({ isActive }) => isActive ? 'active' : ''}>Add Book</NavLink>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<UpdateBook />} />
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
