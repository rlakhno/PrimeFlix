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

`
-- Connect to the customers database
\c customers

-- Drop existing tables if they exist
DROP TABLE IF EXISTS purchases;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;

`


`-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    subscribed BOOLEAN DEFAULT FALSE
);


-- Create the products table
CREATE TABLE products (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  image VARCHAR(255)
);

-- Create the purchases table with a foreign key to users
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  price_id VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  user_id INT NOT NULL,
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (price_id) REFERENCES products(id)
);
`
`
-- Insert sample data into users table
INSERT INTO users (firstName, lastName, email, password) VALUES 
('Tom', 'Hard', 'tomhardt@rogers.com', '$2a$10$nmgcDT3A4rf./t7mINWltubkcvj1i/ISW/VEhOfqvE947kPxIH1Aq'),
('Jane', 'Smith', 'janesmith@yahoo.com', '$2a$10$eNomDgkpUlvnbdU1W.9G8.j9xuNqsNArR42QFcH9V6oL2K5iyvuRW');

-- Insert sample data into products table
INSERT INTO products (id, title, price, quantity, image) VALUES 
('price_1PX6XL1PxLOehmUImH80IHbR', 'Coffee', 4.99, 10, '/images/coffee.jpg'),
('price_1PX6mJ1PxLOehmUIbX85yFVG', '3D Glasses', 9.99, 15, '/images/3d-glasses.jpg'),
('price_1PX6np1PxLOehmUI1bbQrTaZ', 'Camera', 39.99, 7, '/images/camera.jpg'),
('price_1Pb4SL1PxLOehmUIFWRmMWKn', 'Popcorn', 3.99, 47, '/images/popcorn.jpg'),
('price_1PY9gf1PxLOehmUIZoBke1ER', 'Subscription', 2.99, 50, '/images/subscription.jpg');

`

