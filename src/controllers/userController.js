import client from '../database/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
    const thereIsUser = await client.query(`SELECT
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
   `, [tokenData.userId]);

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
