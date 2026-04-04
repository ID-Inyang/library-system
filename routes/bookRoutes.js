import { Router } from "express";
import { createBook, updateBook, deleteBook, getAllBooks, getBookById, borrowBook, returnBook } from "../controllers/bookController.js";

const bookRoutes = Router();

bookRoutes.route('/')
    .post(createBook)
    .get(getAllBooks)

bookRoutes.route('/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook)

bookRoutes.route('/:id/borrow')
    .post(borrowBook)

bookRoutes.route('/:id/return')
    .post(returnBook)

export default bookRoutes