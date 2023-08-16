import express from "express";
import BookController from "../controllers/booksController.js";
import page from "../middlewares/page.js";

const router = express.Router();

router
  .get("/books", BookController.booksList, page)
  .get("/books/busca", BookController.bookListPerFilter, page)
  .get("/books/:id", BookController.bookListPerId)
  .post("/books", BookController.bookRegister)
  .put("/books/:id", BookController.bookUpdate)
  .delete("/books/:id", BookController.deleteBook);

export default router;