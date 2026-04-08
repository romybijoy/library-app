import React, { useState, useEffect } from 'react';

export default function BookForm({ onSubmit, setBookData, editingBook, onCancel }) {
  const [form, setForm] = useState({ title: '', author: '', publishedDate: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title || '',
        author: editingBook.author || '',
        publishedDate: editingBook.publishedDate || '',
      });
    } else {
      setForm({ title: '', author: '', publishedDate: '' });
    }
    setErrors({});
  }, [editingBook]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.author.trim()) errs.author = 'Author is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit({ ...form, publishedDate: form.publishedDate || null });
    setForm({ title: '', author: '', publishedDate: '' });
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">{editingBook ? '✏️ Edit Book' : '➕ Add New Book'}</h2>

      <div className="form-group">
        <label>Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter book title"
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <span className="error-msg">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label>Author *</label>
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Enter author name"
          className={errors.author ? 'input-error' : ''}
        />
        {errors.author && <span className="error-msg">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label>Published Date</label>
        <input
          type="date"
          name="publishedDate"
          value={form.publishedDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
        {editingBook && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
