/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { authors, books } from "../models/index.js";

class BookController {
  static booksList = async (req, res, next) => {
    try {
      const findBooks = books.find();
      req.result = findBooks;
      next();
    } catch (err) {
      next(err);
    }
  };

  static bookRegister = async (req, res, next) => {
    try {
      let book = new books(req.body);
      await book.save();
      res.status(201).send(book.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static bookListPerId = async (req, res, next) => {
    try {
      const id = req.params.id;
      await books.findById(id)
        .populate("autor", "nome")
        .then(book => {
          res.status(200).send(book);
        })
        .catch(err => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  };

  static bookUpdate = async (req, res, next) => {
    try {
      const id = req.params.id;
      await books.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso!" });
    } catch (err) {
      next(err);
    }
  };

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      await books.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro removido com sucesso!" });
    } catch (err) {
      next(err);
    }
  };

  static bookListPerFilter = async (req, res, next) => {
    try {

      const filter = await findProcess(req.query);

      if (filter !== null) {
        let booksResult = books
          .find(filter)
          .populate("autor");
        req.result = booksResult;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (err) {
      next(err);
    }
  };
}

async function findProcess(params) {
  const { editora, titulo, minPaginas, maxPaginas, numeroPaginas, nomeAutor } = params;

  const regex = new RegExp(titulo, "i");

  let filterForFind = {};

  if (editora) filterForFind.editora = editora;
  if (titulo) filterForFind.titulo = regex;

  if (minPaginas || maxPaginas) filterForFind.numeroPaginas = {};
  if (minPaginas) filterForFind.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) filterForFind.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const author = await authors.findOne({ nome: nomeAutor });


    if (author !== null) {
      filterForFind.autor = author._id;
    } else {
      filterForFind = null;
    }

  }

  return filterForFind;
}

export default BookController;