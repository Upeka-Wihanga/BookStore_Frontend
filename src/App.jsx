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
        <nav>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Books</NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? 'active' : ''}>Add Book</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<UpdateBook />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
