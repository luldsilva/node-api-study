import books from "../models/Book.js";

class BookController {
  static booksList = async (req, res) => {
    try {
      res.status(200).json(await
      books.find()
        .populate("autor")
        .then(book => {
          res.status(200).json(book);
        })
        .catch(error => {
          res.status(500).send({ message: `${error.message} - falha ao buscar livro.` });
        })
      );
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static bookRegister = (req, res) => {
    try {
      let book = new books(req.body);
      book.save();
      res.status(201).send(book.toJSON());
    } catch (err) {
      res.status(500).send({ message: `${err} - falha ao cadastrar livro.` });
    }
  };

  static bookListPerId = async (req, res) => {
    try {
      const id = req.params.id;
      await books.findById(id)
        .populate("autor", "nome")
        .then(book => {
          res.status(200).send(book);
        })
        .catch(error => {
          res.status(500).send({ message: `${error.message} - falha ao buscar livro.` });
        });
    } catch (err) {
      res.status(400).send({ message: `${err.message} - Id do livro nao localizado` });
    }
  };

  static bookUpdate = async (req, res) => {
    try {
      const id = req.params.id;
      await books.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static deleteBook = async (req, res) => {
    try {
      const id = req.params.id;
      await books.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro removido com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static bookListPerPublisher = async (req, res) => {
    try {
      const publisher = req.query.editora;
      let returnPublisher = await books.find({ "editora": publisher }, {});
      res.status(200).send(returnPublisher);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default BookController;