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
  console.log('aki');
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

/**
 * @param  {Object} req the require.
 * @param  {Object} res the request.
 */
export async function getUrls(req, res) {
  const urlId = parseInt(req.params.id);
  try {
    const thereIsId = await client.query(`SELECT id, "shortUrl", url 
                                          FROM urls 
                                          WHERE id = $1`, [urlId]);
    if (thereIsId.rowCount ===0) {
      res.sendStatus(404);
      return;
    }
    const urls = {
      id: thereIsId.rows[0].id,
      shortUrl: thereIsId.rows[0].shortUrl,
      url: thereIsId.rows[0].url,
    };

    res.status(200).send(urls);
  } catch (error) {
    res.status(500).send(error);
  }
}

/**
 * @param  {Object} req the require.
 * @param  {Object} res the request.
 */
export async function getShortUrl(req, res) {
  const shortUrl = req.params.shortUrl;
  try {
    const thereIsUrl = await client.query(`SELECT id, url 
                                    FROM urls 
                                    WHERE "shortUrl" = $1`, [shortUrl]);

    console.log(thereIsUrl.rows[0].url);
    if (thereIsUrl.rowCount===0) {
      res.sendStatus(404);
      return;
    }

    await client.query(`UPDATE likes 
                        SET "visitCount" = "visitCount" +1 
                        WHERE "urlId" = $1`, [thereIsUrl.rows[0]?.id]);
    res.redirect(thereIsUrl.rows[0].url);
  } catch (error) {
    res.status(500).send(error);
  }
}
