import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

const Store = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const email = localStorage.getItem('userEmail');
  const password = localStorage.getItem('userPassword');
  const isLoggedIn = !!email && !!password;

  useEffect(() => {
    axios.get('/books')
      .then(res => setBooks(res.data))
      .catch(() => {
        alert('Failed to load books!');
        setBooks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('/cart', { auth: { username: email, password } })
        .then(res => setCart(res.data.map(item => item.book)))
        .catch(() => setCart([]));
      axios.get('/wishlist', { auth: { username: email, password } })
        .then(res => setWishlist(res.data.map(item => item.book)))
        .catch(() => setWishlist([]));
    }
  }, [isLoggedIn, email, password]);

  // Toast helper
  const showToast = (msg, color = '#3182ce') => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2000);
  };

  const handleAddToCart = (book) => {
    if (!isLoggedIn) {
      alert('Please log in to add to cart.');
      navigate('/customer/login');
      return;
    }
    axios.post('/cart/add', null, {
      params: { bookId: book.id },
      auth: { username: email, password }
    })
      .then(() => {
        setCart(prev => [...prev, book]);
        showToast('Added to cart!', '#3182ce');
      })
      .catch(err => {
        let msg = 'Failed to add to cart!';
        if (err.response?.data) {
          if (typeof err.response.data === 'string') {
            msg += ' ' + err.response.data;
          } else if (err.response.data.message) {
            msg += ' ' + err.response.data.message;
          } else {
            msg += ' ' + JSON.stringify(err.response.data);
          }
        }
        showToast(msg, '#e53e3e');
      });
  };

  const handleAddToWishlist = (book) => {
    if (!isLoggedIn) {
      alert('Please log in to add to wishlist.');
      navigate('/customer/login');
      return;
    }
    axios.post('/wishlist/add', null, {
      params: { bookId: book.id },
      auth: { username: email, password }
    })
      .then(() => {
        setWishlist(prev => [...prev, book]);
        showToast('Added to wishlist!', '#e53e3e');
      })
      .catch(err => {
        let msg = 'Failed to add to wishlist!';
        if (err.response?.data) {
          if (typeof err.response.data === 'string') {
            msg += ' ' + err.response.data;
          } else if (err.response.data.message) {
            msg += ' ' + err.response.data.message;
          } else {
            msg += ' ' + JSON.stringify(err.response.data);
          }
        }
        showToast(msg, '#e53e3e');
      });
  };

  return (
    <div className="container" style={{ position: 'relative', minHeight: 600 }}>
      {/* Toast popup */}
      {toast && (
        <div className="toast" style={{ background: toast.color }}>
          {toast.msg}
        </div>
      )}

      {/* Logout button */}
      {isLoggedIn && (
        <button
          className="btn btn-delete"
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            zIndex: 2,
            padding: '8px 20px'
          }}
          onClick={() => {
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userPassword');
            navigate('/');
          }}
        >
          Logout
        </button>
      )}

      {/* <h2 style={{ marginBottom: 8 }}>Book Store</h2> */}
      <p>Browse and shop for your favorite books!</p>
      {!isLoggedIn && (
        <div style={{ marginBottom: 16 }}>
          <button className="btn btn-update" onClick={() => navigate('/customer/login')}>
            Login to add to cart/wishlist
          </button>
        </div>
      )}

      {/* Book List */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          justifyContent: 'flex-start',
          marginTop: 32,
          marginBottom: 40
        }}
      >
        {loading ? (
          <p>Loading books...</p>
        ) : books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          books.map(book => (
            <div
              key={book.id}
              className="book-card"
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>{book.title}</div>
                <div style={{ color: '#4a5568', marginBottom: 8 }}>{book.author}</div>
                <div style={{ fontSize: '0.98rem', color: '#555', marginBottom: 8 }}>
                  <strong>ISBN:</strong> {book.isbn}<br />
                  <strong>Price:</strong> ${book.price}<br />
                  <strong>Stock:</strong> {book.stock}
                </div>
              </div>
              {isLoggedIn && (
                <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                  <button className="btn btn-update" onClick={() => handleAddToCart(book)}>
                    Add to Cart
                  </button>
                  <button className="btn btn-delete" onClick={() => handleAddToWishlist(book)}>
                    Add to Wishlist
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Cart & Wishlist Sections */}
      {isLoggedIn && (
        <div style={{
          display: 'flex',
          gap: 32,
          justifyContent: 'center',
          marginTop: 32,
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: '#f8fafc',
            borderRadius: 10,
            boxShadow: '0 1px 8px rgba(49,130,206,0.08)',
            padding: 20,
            minWidth: 220,
            minHeight: 120,
            flex: '1 1 220px',
            maxWidth: 340
          }}>
            <h3 style={{ marginTop: 0 }}>Cart <span style={{ color: '#3182ce' }}>({cart.length})</span></h3>
            {cart.length === 0 ? (
              <p style={{ color: '#888' }}>Your cart is empty.</p>
            ) : (
              <ul style={{ paddingLeft: 18 }}>
                {cart.map(item => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ul>
            )}
          </div>
          <div style={{
            background: '#f8fafc',
            borderRadius: 10,
            boxShadow: '0 1px 8px rgba(49,130,206,0.08)',
            padding: 20,
            minWidth: 220,
            minHeight: 120,
            flex: '1 1 220px',
            maxWidth: 340
          }}>
            <h3 style={{ marginTop: 0 }}>Wishlist <span style={{ color: '#e53e3e' }}>({wishlist.length})</span></h3>
            {wishlist.length === 0 ? (
              <p style={{ color: '#888' }}>Your wishlist is empty.</p>
            ) : (
              <ul style={{ paddingLeft: 18 }}>
                {wishlist.map(item => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;