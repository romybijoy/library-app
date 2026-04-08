import axios from 'axios';

const API_BASE = '/api/books';

export const bookService = {
  getAll: () => axios.get(API_BASE),
  getById: (id) => axios.get(`${API_BASE}/${id}`),
  create: (book) => axios.post(API_BASE, book),
  update: (id, book) => axios.put(`${API_BASE}/${id}`, book),
  delete: (id) => axios.delete(`${API_BASE}/${id}`),
};
