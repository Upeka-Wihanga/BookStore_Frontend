import React, { useState } from 'react';
import axios from '../../axios';

const initialState = {
  title: '',
  author: '',
  isbn: '',
  price: '',
  stock: '',
};

const AddBook = () => {
  const [book, setBook] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!book.title || book.title.trim().length < 2) errs.title = "Title is required (min 2 chars)";
    if (!book.author || book.author.trim().length < 2) errs.author = "Author is required (min 2 chars)";
    if (!book.isbn || !/^\d{10}(\d{3})?$/.test(book.isbn)) errs.isbn = "ISBN must be 10 or 13 digits";
    if (!book.price || isNaN(book.price) || Number(book.price) <= 0) errs.price = "Price must be a positive number";
    if (!book.stock || isNaN(book.stock) || !Number.isInteger(Number(book.stock)) || Number(book.stock) < 0) errs.stock = "Stock must be a non-negative integer";
    return errs;
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    axios.post('/books', book)
      .then(() => {
        alert('Book added!');
        setBook(initialState);
        setErrors({});
      })
      .catch(err => alert('Failed to add book!'));
  };

  return (
    <div className="container form-section">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={book.title} onChange={handleChange} required minLength={2} />
        {errors.title && <span style={{color:'red', fontSize:'0.9em'}}>{errors.title}</span>}

        <label htmlFor="author">Author</label>
        <input id="author" name="author" value={book.author} onChange={handleChange} required minLength={2} />
        {errors.author && <span style={{color:'red', fontSize:'0.9em'}}>{errors.author}</span>}

        <label htmlFor="isbn">ISBN</label>
        <input id="isbn" name="isbn" value={book.isbn} onChange={handleChange} required pattern="\d{10}(\d{3})?" />
        {errors.isbn && <span style={{color:'red', fontSize:'0.9em'}}>{errors.isbn}</span>}

        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="number" value={book.price} onChange={handleChange} required min="0.01" step="0.01" />
        {errors.price && <span style={{color:'red', fontSize:'0.9em'}}>{errors.price}</span>}

        <label htmlFor="stock">Stock</label>
        <input id="stock" name="stock" type="number" value={book.stock} onChange={handleChange} required min="0" step="1" />
        {errors.stock && <span style={{color:'red', fontSize:'0.9em'}}>{errors.stock}</span>}

        <button className="btn btn-submit" type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddBook;
