const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const pgp = require('pg-promise')();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection setup
const db = pgp({
  connectionString: 'postgresql://username:password@localhost:5432/database_name',
});

app.use(bodyParser.json());
app.use(cors());

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.none('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [username, hashedPassword]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.one('SELECT * FROM users WHERE username = $1', [username]);
    const match = await bcrypt.compare(password, user.password_hash);

    if (match) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
