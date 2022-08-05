import signUpSchema from '../schemas/authSchema.js';

/**
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Function} next
 * @return {void}
 */
export default function signupValidation(req, res, next) {
  const validation = signUpSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }
  next();
}

