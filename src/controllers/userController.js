import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {userRepository} from '../repository/userRepository.js';

dotenv.config();

/**
 * @param  {Object} req the require.
 * @param  {Object} res the request.
 */
export async function getUniqueUser(req, res) {
  const {authorization}= req.headers;
  const token = authorization?.replace('Bearer ', '');
  const key = process.env.ACESS_TOKEN;
  const tokenData = jwt.verify(token, key, (err, payload)=>{
    if (err) {
      return;
    }
    return payload;
  },
  );
  if (!tokenData) {
    res.sendStatus(401);
    return;
  }
  try {
    const thereIsUser = await userRepository.queryUniqueUser(tokenData.userId);

    if (thereIsUser.rowCount ===0) {
      res.sendStatus(404);
      return;
    }
    const {rows: userObject} = thereIsUser;
    const newArr = [];
    for (const v of userObject) {
      newArr.push(v.json_build_object);
    }
    const userToSend = newArr[0];
    res.status(200).send(userToSend);
  } catch (error) {
    res.status(500).send(error);
  }
}


/**
 * @param  {Object} req the require.
 * @param  {Object} res the request.
 */
export async function userRanking(req, res) {
  try {
    const ranking = await userRepository.queryRanking();
    if (ranking.rowCount === 0) {
      res.sendStatus(404);
      return;
    }
    const {rows: usersRaking} = ranking;
    res.status(200).send(usersRaking);
  } catch (error) {
    res.status(500).send(error);
  }
}
