import client from '../database/db.js';

/**
 *  @param  {String} url insert url.
 * @param  {String} shortenUrl insert shortenUrl.
 * @param  {Number} id insert userId.
 */
async function queryGetId(url, shortenUrl, id) {
  return client.query(`INSERT INTO urls(url, "shortUrl", "userId")
    VALUES($1,$2,$3) RETURNING id`, [url, shortenUrl, id]);
}

/**
 *  @param  {Number} urlId insert urlId.
 * @param  {Number} userId insert userId.
 * @param  {Number} count insert count default 0.
 */
async function queryInsertUrl(urlId, userId, count) {
  return client.query(`INSERT INTO likes("urlId", "userId", "visitCount") 
    VALUES($1,$2,$3)`, [urlId, userId, count]);
}

/**
 *  @param  {Number} urlId select by urlId.
 */
async function queryIdUrl(urlId) {
  return client.query(`SELECT id, "shortUrl", url, "userId" 
                       FROM urls 
                       WHERE id = $1`, [urlId]);
}

/**
 *  @param  {String} shortUrl select by shortUrl.
 */
async function queryUrlByShorten(shortUrl) {
  return client.query(`SELECT id, url 
                       FROM urls 
                       WHERE "shortUrl" = $1`, [shortUrl]);
}
/**
 *  @param  {Number} id update where id = urlId.
 */
async function queryUpdateCount(id) {
  return client.query(`UPDATE likes 
                       SET "visitCount" = "visitCount" +1 
                       WHERE "urlId" = $1`, [id]);
}
/**
 *  @param  {Number} urlId delete by urlId.
 */
async function queryDeleteViews(urlId) {
  return client.query(`DELETE FROM likes WHERE "urlId" = $1`, [urlId]);
}
/**
 *  @param  {Number} urlId delete by urlId.
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
