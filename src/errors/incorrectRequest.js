import BaseError from "./baseError.js";

class IncorrectRequest extends BaseError {
  constructor(mensagem = "Um ou mais dados fornecidos estão incorretos") {
    super(mensagem, 400);
  }
}

export default IncorrectRequest;