import {signInSchema} from '../schemas/authSchema.js';

/**
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Function} next
 * @return {void}
 */
export default function signinValidation(req, res, next) {
  const validation = signInSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }
  next();
}
