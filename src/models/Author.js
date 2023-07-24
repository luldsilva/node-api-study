import mongoose, { SchemaTypes } from "mongoose";
const authorSchema = new mongoose.Schema(
  {
    id: { type: SchemaTypes.ObjectId },
    nome: { type: String, required: true },
    nacionalidade: { type: String }
  },
  {
    versionKey: false
  }
)

const authors = mongoose.model("authors", authorSchema);

export default authors;