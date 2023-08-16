import mongoose from "mongoose";
import BaseError from "../errors/baseError.js";
import IncorrectRequest from "../errors/incorrectRequest.js";
import ValidationError from "../errors/validationError.js";
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new IncorrectRequest().responseSend(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationError(err).responseSend(res);
  } else if (err instanceof BaseError) {
    err.responseSend(res);
  }
  else {
    new BaseError().responseSend(res);
  }
}

export default errorHandler;