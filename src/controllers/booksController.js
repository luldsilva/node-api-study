/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import books from "../models/Book.js";

class BookController {
  static booksList = async (req, res, next) => {
    try {
      res.status(200).json(await
        books.find()
          .populate("autor")
          .then(book => {
            res.status(200).json(book);
          })
          .catch(err => {
            next(err);
          })
      );
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

  static bookListPerPublisher = async (req, res, next) => {
    try {
      const publisher = req.query.editora;
      let returnPublisher = await books.find({ "editora": publisher }, {});
      res.status(200).send(returnPublisher);
    } catch (err) {
      next(err);
    }
  };
}

export default BookController;