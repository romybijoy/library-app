import React, { useState } from 'react';
import { bookService } from '../services/bookService';

export default function SearchById({ onEdit, onDelete }) {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const id = searchId.trim();
    if (!id || isNaN(id)) {
      setError('Please enter a valid numeric ID');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await bookService.getById(id);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Book not found');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchId('');
    setResult(null);
    setError('');
  };

  const handleEdit = () => {
    onEdit(result);
    handleClear();
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${result.title}"?`)) return;
    await onDelete(result.id);
    handleClear();
  };

  return (
    <div className="search-by-id">
      <h2 className="form-title">🔍 Search by ID</h2>
      <form onSubmit={handleSearch} noValidate>
        <div className="search-row">
          <input
            type="number"
            min="1"
            value={searchId}
            onChange={(e) => { setSearchId(e.target.value); setError(''); setResult(null); }}
            placeholder="Enter Book ID..."
            className={error ? 'input-error' : ''}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '…' : 'Find'}
          </button>
          {(result || error) && (
            <button type="button" className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          )}
        </div>
        {error && <span className="error-msg">{error}</span>}
      </form>

      {result && (
        <div className="search-result">
          <div className="result-spine"></div>
          <div className="result-body">
            <div className="book-id">#{result.id}</div>
            <h3 className="book-title">{result.title}</h3>
            <p className="book-author">by {result.author}</p>
            {result.publishedDate && (
              <p className="book-date">
                📅 {new Date(result.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </p>
            )}
            <div className="result-actions">
              <button className="btn btn-primary" onClick={handleEdit}>✏️ Edit</button>
              <button className="btn btn-danger" onClick={handleDelete}>🗑️ Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
