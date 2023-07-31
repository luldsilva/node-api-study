import BaseError from "./baseError.js";

class NotFound extends BaseError {
  constructor(msg = "Página não encontrada") {
    super(msg, 404);
  }
}

export default NotFound;