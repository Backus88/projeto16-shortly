import client from '../database/db.js';

/**
 *  @param  {String} email query id.
 */
async function queryGetUserByEmail(email) {
  return client.query(`SELECT * 
                       FROM users 
                       WHERE email = $1`, [email]); ;
}
/**
 * @param  {String} name query id.
 * @param  {String} email query id.
 * @param  {String} passwordHash query id.
 */
async function queryInsertUser(name, email, passwordHash) {
  client.query(`INSERT INTO users(name, email, password) 
                VALUES ($1, $2, $3)`, [name, email, passwordHash]);
}

export const authRepository ={
  queryGetUserByEmail,
  queryInsertUser,
};
