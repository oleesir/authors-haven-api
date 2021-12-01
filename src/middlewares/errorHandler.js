/**
  * @method sendError
  * @param {object} err
  * @param {object} req
  * @param {object} res
  * @param {function} next
  *
  * @returns {(function|object)} Function next() or JSON object
  */
const sendError = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(err.status || 500).json({ status: 'failure', error: err.message });
};

export default sendError;
