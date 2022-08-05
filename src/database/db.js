import pkg from 'pg';
import dotenv from 'dotenv';
const {Pool} = pkg;


dotenv.config();
let client;
try {
  client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} catch (error) {
  console.log('erro opening the db');
}


export default client;
