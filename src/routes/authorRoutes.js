import express from "express";
import AuthorController from "../controllers/authorController.js";
import page from "../middlewares/page.js";

const router = express.Router();

router
  .get("/author", AuthorController.authorList, page)
  .get("/author/:id", AuthorController.authorListPerId)
  .post("/author", AuthorController.authorRegister)
  .put("/author/:id", AuthorController.authorUpdate)
  .delete("/author/:id", AuthorController.deleteAuthor);

export default router;