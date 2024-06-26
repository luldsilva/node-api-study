import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import handler404 from "./middlewares/handler404.js";

db.on("error", console.log.bind(console, "Erro de conn"));
db.once("open", () => {
});

const app = express();
app.use(express.json());
routes(app);

app.use(handler404);
app.use(errorHandler);

export default app;