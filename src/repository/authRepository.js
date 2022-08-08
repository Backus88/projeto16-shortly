import client from '../database/db.js';

/**
 *  @param  {String} email select by email.
 */
async function queryGetUserByEmail(email) {
  return client.query(`SELECT * 
                       FROM users 
                       WHERE email = $1`, [email]); ;
}
/**
 * @param  {String} name insert name.
 * @param  {String} email insert email.
 * @param  {String} passwordHash insert password.
 */
async function queryInsertUser(name, email, passwordHash) {
  client.query(`INSERT INTO users(name, email, password) 
                VALUES ($1, $2, $3)`, [name, email, passwordHash]);
}

export const authRepository ={
  queryGetUserByEmail,
  queryInsertUser,
};
