import express from "express";
import AuthorController from "../controllers/authorController.js";

const router = express.Router();

router
  .get("/author", AuthorController.authorList)
  .get("/author/:id", AuthorController.authorListPerId)
  .post("/author", AuthorController.authorRegister)
  .put("/author/:id", AuthorController.authorUpdate)
  .delete("/author/:id", AuthorController.deleteAuthor);

export default router;