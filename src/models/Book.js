import mongoose, { SchemaTypes } from "mongoose";

const schemaBook = new mongoose.Schema({
  id: { type: SchemaTypes.ObjectId },
  titulo: {
    type: String,
    required: [true, "O título é obrigatório."]
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: [true, "O(a) autor(a) é obrigatório."]
  },
  editora: {
    type: String,
    required: [true, "A editora é obrigatória."],
    enum: {
      values: ["Casa do código", "Alura"],
      message: "A editora {VALUE} não é um valor permitido."
    }
  },
  numeroPaginas: {
    type: Number,
    min: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}."],
    max: [5000, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}."]
  }
});

const books = mongoose.model("books", schemaBook);

export default books;