import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [confirmBook, setConfirmBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  function handleDelete(id) {
    setConfirmBook(books.find(b => b.id === id));
  }

  function confirmDelete() {
    axios.delete(`/books/${confirmBook.id}`)
      .then(() => {
        setBooks(books.filter(b => b.id !== confirmBook.id));
        setConfirmBook(null);
      })
      .catch(err => {
        alert('Failed to delete!');
        setConfirmBook(null);
      });
  }

  function cancelDelete() {
    setConfirmBook(null);
  }

  function handleUpdate(id) {
    navigate(`/edit/${id}`);
  }

  return (
    <div className="container">
      <h2>Book List</h2>
      <div className="book-list">
        {books.map(book => (
          <div className="book-card" key={book.id}>
            <div>
              <div className="book-title">{book.title}</div>
              <div className="book-author">{book.author}</div>
              <div className="book-details">
                <div><strong>ISBN:</strong> {book.isbn}</div>
                <div><strong>Price:</strong> ${book.price}</div>
                <div><strong>Stock:</strong> {book.stock}</div>
              </div>
            </div>
            <div className="button-group">
              <button className="btn btn-delete" onClick={() => handleDelete(book.id)}>Delete</button>
              <button className="btn btn-update" onClick={() => handleUpdate(book.id)}>Update</button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {confirmBook && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <h3 style={{color:'#e53e3e'}}>Are you sure you want to delete this book?</h3>
            <div style={{margin: '16px 0', color:'#2d3748'}}>
              <strong>Title:</strong> {confirmBook.title}<br />
              <strong>Author:</strong> {confirmBook.author}<br />
              <strong>ISBN:</strong> {confirmBook.isbn}<br />
              <strong>Price:</strong> ${confirmBook.price}<br />
              <strong>Stock:</strong> {confirmBook.stock}
            </div>
            <div style={{display:'flex', gap:12, justifyContent:'center'}}>
              <button className="btn btn-delete" onClick={confirmDelete}>Yes, Delete</button>
              <button className="btn btn-update" onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
