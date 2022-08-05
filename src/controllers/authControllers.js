import client from '../database/db.js';
import bcrypt from 'bcrypt';
/**
 * @param  {Object} req the require.
 * @param  {Object} res the request.
 */
export async function signUp(req, res) {
  const {name, email, password} = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    const thereIsEmail =
        await client.query('SELECT * FROM users WHERE email = $1', [email]);

    if (thereIsEmail.rowCount > 0) {
      res.sendStatus(409);
      return;
    }
    await client.query(`INSERT INTO users(name, email, password) 
        VALUES ($1, $2, $3)`, [name, email, passwordHash]);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
}

/**
 * @param  {Object} req the require.
 * @param  {Object} res the request.
 */
export async function signIn(req, res) {
  const {email, password} = req.body;
  try {
    const thereIsEmail =
      await client.query(`SELECT password
                          FROM users 
                          WHERE email = $1`, [email]);
    const passwordFound = thereIsEmail.rows[0].password;
    const authorization = bcrypt.compareSync(password, passwordFound);
    if (authorization && thereIsEmail.rowCount>0) {
      res.sendStatus(200);
      return;
    }
    res.sendStatus(401);
  } catch (error) {
    res.status(500).send(error);
  }
}
