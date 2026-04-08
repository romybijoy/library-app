import React, { useState, useEffect, useCallback } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import SearchById from './components/SearchById';
import { bookService } from './services/bookService';
import './App.css';

export default function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await bookService.getAll();
      setBooks(res.data);
    } catch (err) {
      showToast('Failed to fetch books', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  const handleSubmit = async (bookData) => {
    try {
      if (editingBook) {
        await bookService.update(editingBook.id, bookData);
        showToast('Book updated successfully!');
        setEditingBook(null);
      } else {
        await bookService.create(bookData);
        showToast('Book added successfully!');
      }
      fetchBooks();
    } catch (err) {
      const msg = err.response?.data?.message ||
                  JSON.stringify(err.response?.data?.fieldErrors) ||
                  'Operation failed';
      showToast(msg, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      await bookService.delete(id);
      showToast('Book deleted.');
      fetchBooks();
    } catch (err) {
      showToast('Failed to delete book', 'error');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">📖</span>
            <div>
              <h1>LibraryOS</h1>
              <p>Book Management System</p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-num">{books.length}</span>
              <span className="stat-label">Books</span>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <BookForm
            onSubmit={handleSubmit}
            editingBook={editingBook}
            onCancel={() => setEditingBook(null)}
          />
          <SearchById
            onEdit={setEditingBook}
            onDelete={handleDelete}
          />
        </aside>

        <section className="content">
          <div className="section-header">
            <h2>Library Collection</h2>
            <span className="book-count">
              {searchQuery
                ? `${filteredBooks.length} of ${books.length} book${books.length !== 1 ? 's' : ''}`
                : `${books.length} book${books.length !== 1 ? 's' : ''}`}
            </span>
          </div>

          <div className="search-bar-wrapper">
            <span className="search-bar-icon">🔍</span>
            <input
              className="search-bar"
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')} title="Clear search">
                ✕
              </button>
            )}
          </div>

          {searchQuery && filteredBooks.length === 0 && !loading && (
            <div className="no-results">
              <span>😕</span>
              <p>No books match "<strong>{searchQuery}</strong>"</p>
              <button className="btn btn-secondary" onClick={() => setSearchQuery('')}>Clear Search</button>
            </div>
          )}

          <BookList
            books={filteredBooks}
            onEdit={setEditingBook}
            onDelete={handleDelete}
            loading={loading}
          />
        </section>
      </main>

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === 'success' ? '✅' : '❌'} {toast.message}
        </div>
      )}
    </div>
  );
}
