const pool = require('./pool'); 

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
`;

(async () => {
  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    console.log('Table created successfully');
    client.release();
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    pool.end();
  }
})();
