import {shortenUrlSchema} from '../schemas/urlSchema.js';

/**
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Function} next
 * @return {void}
 */
export default function shortenUrlValidation(req, res, next) {
  const validation = shortenUrlSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }
  next();
}
