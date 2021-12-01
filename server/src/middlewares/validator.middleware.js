import { validationResult, matchedData } from 'express-validator';
/**
 * @method validateResult
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 *
 * @returns {function} res or next
 */
const validateResult = (req, res, next) => {
  req = { ...req, ...matchedData(req) };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const mappedErrors = Object.entries(errors.mapped()).reduce((acc, [key, value]) => {
      acc[key] = value.msg;
      return acc;
    }, {});
    return res.status(400).json({ status: 'failure', error: mappedErrors });
  }
  next();
};

export default validateResult;
