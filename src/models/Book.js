import mongoose, { SchemaTypes } from "mongoose";

const schemaBook = new mongoose.Schema({
  id: { type: SchemaTypes.ObjectId },
  titulo: { type: String, required: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'authors', required: true },
  editora: { type: String, required: true },
  numeroPaginas: { type: Number }
});

const books = mongoose.model('books', schemaBook);

export default books;