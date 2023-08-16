import IncorrectRequest from "../errors/incorrectRequest.js";

async function page(req, res, next) {
  try {
    let { findLimit = 2, page = 1, fieldOrdination = "titulo", order = -1 } = req.query;

    findLimit = parseInt(findLimit);
    page = parseInt(page);
    order = parseInt(order);

    const resultRequest = req.result;

    if (findLimit > 0 && page > 0) {
      res.status(200).json(await
      resultRequest.find()
        .sort({ [fieldOrdination]: order })
        .skip((page - 1) * findLimit)
        .limit(findLimit)
        .then(book => {
          res.status(200).json(book);
        })
        .catch(err => {
          next(err);
        })
      );
    } else {
      next(new IncorrectRequest());
    }
  } catch (error) {
    next(error);
  }
}

export default page;