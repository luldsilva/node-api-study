import mongoose from "mongoose";
import authors from "../models/Author.js";

class AuthorController {
  static authorList = async (req, res) => {
    try {
      res.status(200).json(await authors.find());
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static authorRegister = async (req, res) => {
    try {
      let author = new authors(req.body);
      await author.save();
      res.status(201).send(author.toJSON());
    } catch (err) {
      res.status(500).send({ message: `${err} - falha ao cadastrar autor.` });
    }
  };

  static authorListPerId = async (req, res) => {
    try {
      const id = req.params.id;
      const authorReturn = await authors.findById(id);
      authorReturn !== null ? res.status(200).send(authorReturn) : res.status(404).send({ message: "Id do autor nao localizado" });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Um ou mais dados fornecidos estao incorretos." });
      } else {
        res.status(500).send({ message: "Erro interno do servidor" });
      }
    }
  };

  static authorUpdate = async (req, res) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static deleteAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default AuthorController;