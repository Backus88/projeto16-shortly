import dotenv from 'dotenv';
import {nanoid} from 'nanoid';
import {urlRepository} from '../repository/urlRepository.js';

dotenv.config();

/**
 * @param  {Object} req the require.
 * @param  {Object} res the request.
 */
export async function shortenUrl(req, res) {
  const {url}= req.body;
  const shortenUrl = nanoid(8);
  const urlShort = {shortUrl: shortenUrl};
  const countStart = 0;
  const tokenData = req.token;
  try {
    const urlId= await urlRepository.queryGetId(url,
        shortenUrl,
        tokenData.userId);

    await urlRepository.queryInsertUrl(urlId.rows[0].id,
        tokenData.userId,
        countStart);

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
    const thereIsId = await urlRepository.queryIdUrl(urlId);
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
    const thereIsUrl = await urlRepository.queryUrlByShorten(shortUrl);

    if (thereIsUrl.rowCount===0) {
      res.sendStatus(404);
      return;
    }

    await urlRepository.queryUpdateCount(thereIsUrl.rows[0]?.id);
    res.redirect(200, thereIsUrl.rows[0].url);
  } catch (error) {
    res.status(500).send(error);
  }
}

/**
 * @param  {Object} req the require.
 * @param  {Object} res the request.
 */
export async function deleteUrl(req, res) {
  const urlId = parseInt(req.params.id);
  const tokenData = req.token;
  try {
    const thereIsId = await urlRepository.queryIdUrl(urlId);
    if (thereIsId.rowCount ===0) {
      res.sendStatus(404);
      return;
    }
    if (!tokenData || thereIsId.rows[0].userId !== tokenData.userId) {
      res.sendStatus(401);
      return;
    }
    await urlRepository.queryDeleteViews(urlId);
    await urlRepository.queryDeleteUrls(urlId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error);
  }
}
