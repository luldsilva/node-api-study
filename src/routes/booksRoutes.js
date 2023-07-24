import express from "express";
import BookController from "../controllers/booksController.js";

const router = express.Router();

router
  .get("/books", BookController.booksList)
  .get("/books/busca", BookController.bookListPerPublisher)
  .get("/books/:id", BookController.bookListPerId)
  .post("/books", BookController.bookRegister)
  .put("/books/:id", BookController.bookUpdate)
  .delete("/books/:id", BookController.deleteBook)

export default router;