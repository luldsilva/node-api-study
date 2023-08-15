/* eslint-disable no-unused-vars */
import NotFound from "../errors/NotFound.js";
import { authors } from "../models/index.js";

class AuthorController {
  static authorList = async (req, res, next) => {
    try {
      res.status(200).json(await authors.find());
    } catch (err) {
      next(err);
    }
  };

  static authorRegister = async (req, res, next) => {
    try {
      let author = new authors(req.body);
      await author.save();
      res.status(201).send(author.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static authorListPerId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const authorReturn = await authors.findById(id);
      authorReturn !== null ? res.status(200).send(authorReturn) : next(new NotFound("Id do autor nao localizado"));
    } catch (err) {
      next(err);
    }
  };

  static authorUpdate = async (req, res, next) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso!" });
    } catch (err) {
      next(err);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso!" });
    } catch (err) {
      next(err);
    }
  };
}

export default AuthorController;