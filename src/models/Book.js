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
    required: [true, "A editora é obrigatória."]
  },
  numeroPaginas: { type: Number }
});

const books = mongoose.model("books", schemaBook);

export default books;