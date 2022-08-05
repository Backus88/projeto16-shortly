import client from '../database/db.js';
/**
 * @param  {Object} req the require.
 * @param  {Object} res the request.
 */
export async function signUp(req, res) {
  const {name, email, password} = req.body;
  try {
    const thereIsEmail =
        await client.query('SELECT * FROM users WHERE email = $1', [email]);

    if (thereIsEmail.rowCount > 0) {
      res.sendStatus(409);
      return;
    }
    await client.query(`INSERT INTO users(name, email, password) 
        VALUES ($1, $2, $3)`, [name, email, password]);
  } catch (error) {
    res.status(500).send(error);
  }
}
