# LibraryOS — Spring Boot + React Book Management App

A full-stack Library Management application with a Spring Boot REST API backend and React frontend.

---

## 📁 Project Structure

```
library-app/
├── backend/          ← Spring Boot (Java 17)
│   ├── pom.xml
│   └── src/main/java/com/library/books/
│       ├── BooksApiApplication.java
│       ├── entity/Book.java
│       ├── repository/BookRepository.java
│       ├── service/BookService.java
│       ├── controller/BookController.java
│       └── exception/
│           ├── BookNotFoundException.java
│           └── GlobalExceptionHandler.java
└── frontend/         ← React 18
    ├── package.json
    └── src/
        ├── App.js / App.css
        ├── services/bookService.js
        └── components/
            ├── BookForm.js
            └── BookList.js
```

---

## 🚀 Running the App

### 1. Start the Backend

**Prerequisites:** Java 17+, Maven 3.6+

```bash
cd backend
mvn spring-boot:run
```

Backend runs at: **http://localhost:8080**
H2 Console: **http://localhost:8080/h2-console**

### 2. Start the Frontend

**Prerequisites:** Node.js 16+, npm

```bash
cd frontend
npm install
npm start
```

Frontend runs at: **http://localhost:3000**

---

## 📡 REST API Endpoints

| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| GET    | /api/books         | Fetch all books        |
| GET    | /api/books/{id}    | Fetch a book by ID     |
| POST   | /api/books         | Add a new book         |
| PUT    | /api/books/{id}    | Update a book by ID    |
| DELETE | /api/books/{id}    | Delete a book by ID    |

### Example POST Body
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "publishedDate": "2008-08-01"
}
```

---

## 🛠️ Tech Stack

- **Backend:** Spring Boot 3.2, Spring Data JPA, H2 (in-memory), Bean Validation
- **Frontend:** React 18, Axios
- **Database:** H2 in-memory (auto-configured, no setup needed)
