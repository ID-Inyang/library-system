# library-system
TS Academy Assignment: School Library Management API.


## Project Description

This is a RESTful API built using Node.js, Express, and MongoDB for managing a school library system.

It allows:

* Managing authors, books, students, and librarians
* Borrowing and returning books
* Tracking who borrowed a book and when it should be returned

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* Dotenv

---

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/ID-Inyang/library-system
cd library-system
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the server:

```bash
pnpm dev
```

## Environment Variables
Create a .env file in the root directory with the following:
MONGO_URI=your_mongodb_connection_string
PORT=5000
---

## API Endpoints

### Books

* POST /books → Create book
* GET /books → Get all books
* GET /books/:id → Get single book
* PUT /books/:id → Update book
* DELETE /books/:id → Delete book
* POST /books/:id/borrow → Borrow book
* POST /books/:id/return → Return book

---

### Authors

* POST /authors
* GET /authors
* GET /authors/:id
* PUT /authors/:id
* DELETE /authors/:id

---

### Students

* POST /students
* GET /students
* GET /students/:id

---

###  Library Attendant

* POST /attendants
* GET /attendants

---

## Prerequisites
* Node.js
* MongoDB


## Notes

* Books can only be borrowed if status is "IN"
* When borrowed, book status changes to "OUT"
* When returned, status resets to "IN"

---

##  Author

Idongesit Inyang