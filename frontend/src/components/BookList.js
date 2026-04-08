import React from 'react';

export default function BookList({ books, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📚</span>
        <p>No books in the library yet.</p>
        <p className="empty-sub">Add your first book using the form.</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div className="book-spine"></div>
          <div className="book-content">
            <div className="book-id">#{book.id}</div>
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">by {book.author}</p>
            {book.publishedDate && (
              <p className="book-date">
                📅 {new Date(book.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            )}
          </div>
          <div className="book-actions">
            <button className="btn-icon btn-edit" onClick={() => onEdit(book)} title="Edit">
              ✏️
            </button>
            <button className="btn-icon btn-delete" onClick={() => onDelete(book.id)} title="Delete">
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
