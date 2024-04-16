import mongoose from "mongoose";

mongoose.connect("mongodb+srv://lucasstrlisilva:amxH5RIKH6DYSAbB@cluster-study.rfat5jd.mongodb.net/");

let db = mongoose.connection;

export default db;