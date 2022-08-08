import client from '../database/db.js';

/**
 *  @param  {String} url query id.
 * @param  {String} shortenUrl query id.
 * @param  {Number} id query id.
 */
async function queryGetId(url, shortenUrl, id) {
  return client.query(`INSERT INTO urls(url, "shortUrl", "userId")
    VALUES($1,$2,$3) RETURNING id`, [url, shortenUrl, id]);
}

/**
 *  @param  {Number} urlId query id.
 * @param  {Number} userId query id.
 * @param  {Number} count query id.
 */
async function queryInsertUrl(urlId, userId, count) {
  return client.query(`INSERT INTO likes("urlId", "userId", "visitCount") 
    VALUES($1,$2,$3)`, [urlId, userId, count]);
}

/**
 *  @param  {Number} urlId query id.
 */
async function queryIdUrl(urlId) {
  return client.query(`SELECT id, "shortUrl", url, "userId" 
                       FROM urls 
                       WHERE id = $1`, [urlId]);
}

/**
 *  @param  {String} shortUrl query id.
 */
async function queryUrlByShorten(shortUrl) {
  return client.query(`SELECT id, url 
                       FROM urls 
                       WHERE "shortUrl" = $1`, [shortUrl]);
}
/**
 *  @param  {Number} id query id.
 */
async function queryUpdateCount(id) {
  return client.query(`UPDATE likes 
                       SET "visitCount" = "visitCount" +1 
                       WHERE "urlId" = $1`, [id]);
}
/**
 *  @param  {Number} urlId query id.
 */
async function queryDeleteViews(urlId) {
  return client.query(`DELETE FROM likes WHERE "urlId" = $1`, [urlId]);
}
/**
 *  @param  {Number} urlId query id.
 */
async function queryDeleteUrls(urlId) {
  return client.query(`DELETE FROM urls WHERE id = $1`, [urlId]);
}

export const urlRepository ={
  queryGetId,
  queryInsertUrl,
  queryIdUrl,
  queryUrlByShorten,
  queryUpdateCount,
  queryDeleteViews,
  queryDeleteUrls,
};
