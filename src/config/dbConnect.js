import mongoose from "mongoose";

mongoose.connect("mongodb+srv://lucaslisilva:14m0Kq54qCi3Oj0N@cluster0.hhyy196.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;