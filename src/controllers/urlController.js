import client from '../database/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {nanoid} from 'nanoid';

dotenv.config();

/**
 * @param  {Object} req the require.
 * @param  {Object} res the request.
 */
export async function shortenUrl(req, res) {
  const {authorization} = req.headers;
  const {url}= req.body;
  const shortenUrl = nanoid(8);
  const token = authorization?.replace('Bearer ', '');
  const key = process.env.ACESS_TOKEN;
  const tokenData = jwt.verify(token, key);
  const urlShort = {shortUrl: shortenUrl};
  const countStart = 0;
  if (!tokenData) {
    res.sendStatus(401);
    return;
  }
  try {
    const urlId= await client.query(`INSERT INTO urls(url, "shortUrl", "userId")
        VALUES($1,$2,$3) RETURNING id`, [url, shortenUrl, tokenData.userId]);

    await client.query(`INSERT INTO likes("urlId", "userId", "visitCount") 
        VALUES($1,$2,$3)`, [urlId.rows[0].id, tokenData.userId, countStart]);

    res.status(201).send(urlShort);
  } catch (error) {
    res.status(500).send(error);
  }
}
