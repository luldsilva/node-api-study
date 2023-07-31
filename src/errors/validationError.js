import IncorrectRequest from "./incorrectRequest.js";

class ValidationError extends IncorrectRequest {
  constructor(err) {
    const errorMsg = Object.values(err.errors)
      .map(err => err.message)
      .join("; ");
    super(`Os seguintes erros foram encontrados: ${errorMsg}`);
  }
}

export default ValidationError;