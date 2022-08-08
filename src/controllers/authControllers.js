import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {authRepository} from '../repository/authRepository.js';

dotenv.config();

/**
 * @param  {Object} req the require.
 * @param  {Object} res the request.
 */
export async function signUp(req, res) {
  const {name, email, password} = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    const thereIsEmail = await authRepository.queryGetUserByEmail(email);

    if (thereIsEmail.rowCount > 0) {
      res.sendStatus(409);
      return;
    }
    await authRepository.queryInsertUser(name, email, passwordHash);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
}

/**
 * @param  {Object} req the require.
 * @param  {Object} res the request.
 */
export async function signIn(req, res) {
  const {email, password} = req.body;
  try {
    const thereIsEmail = await authRepository.queryGetUserByEmail(email);
    if (thereIsEmail.rowCount ===0) {
      res.sendStatus(401);
      return;
    }
    const passwordFound = thereIsEmail.rows[0]?.password;
    const idFound = thereIsEmail.rows[0]?.id;
    const data = {userId: idFound};
    const key = process.env.ACESS_TOKEN;
    const authorization = bcrypt.compareSync(password, passwordFound);
    if (authorization && thereIsEmail.rowCount>0) {
      const token =jwt.sign(data, key, {expiresIn: 60*60});
      res.status(200).send(token);
      return;
    }
    res.sendStatus(401);
  } catch (error) {
    res.status(500).send(error);
  }
}
