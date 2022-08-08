import client from '../database/db.js';

/**
 * @param  {Number} userId query id.
 */
async function queryUniqueUser(userId) {
  return client.query(`SELECT
  json_build_object(
  'id', users.id, 
  'name',users.name, 
  'visitCount',(SELECT SUM("visitCount") 
 FROM likes 
 JOIN users u ON u.id = likes."userId"
 GROUP BY likes."userId", u.id) ,
  'shortenedUrls',
   json_agg(   
   json_build_object(  
   'id',urls.id,
   'shortUrl',urls."shortUrl",
   'url',urls.url,
   'visitCount',l."visitCount"
  )
  )
 )
 FROM users
 JOIN urls  on urls."userId" = users.id
 JOIN likes l on l."urlId" = urls.id
 WHERE users.id = $1
 GROUP BY users.id
 `, [userId]);
}
/**
 */
async function queryRanking() {
  return client.query(`SELECT users.id AS id , 
    users.name, 
    COUNT(urls."userId") AS "linksCount", 
    (SELECT SUM("visitCount")
    FROM likes 
    JOIN users u ON u.id = likes."userId"
    GROUP BY likes."userId", u.id) AS "visitCount"
  FROM users
  JOIN urls on urls."userId"= users.id
  GROUP BY users.id
  ORDER BY "linksCount" DESC
  LIMIT 10`);
}

export const userRepository ={
  queryUniqueUser,
  queryRanking,
};