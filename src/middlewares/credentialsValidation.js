import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

/**
 * @param  {Object} req the require
 * @param  {Object} res the response
 * @param  {Function} next
 * @return {void}
 */
export default function credentialsValidation(req, res, next) {
  const {authorization} = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const key = process.env.ACESS_TOKEN;
  const tokenData = jwt.verify(token, key, (err, payload)=>{
    if (err) {
      return;
    }
    req.token = payload;
    return payload;
  },
  );
  if (!tokenData) {
    res.sendStatus(401);
    return;
  }
  next();
}
