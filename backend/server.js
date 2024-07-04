
// server.js

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const pool = require('./db/pool');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { Axios }  = require('axios');
const axios = require('axios');


//My keys: sk_test_51POi051PxLOehmUIIL9S0xiFaI3zaxfeMpAfrb4MSs6eb9JKI59tc2SRXQXsbYRgOK4Xo5L9oaUQBBH3KK9QjQZI00YwT0o0Ee
// sk_test_51LnUKJDM1jwCEz8OJG69szv032rIo4X0WrFMaXrqxu9g8fdohsL1y54JEUhFUKrqoBquVjN3AzpIFyrbN915bgcd00O5hqoGCJ
// Coffee: price_1LnUTFDM1jwCEz8OGoOSXiSM
// Sunglasses: price_1LnUTxDM1jwCEz8OAqHYTwKQ
// Camera: price_1LnUUoDM1jwCEz8OvxIcJ7to
// Stripe 
const stripe = require('stripe')('sk_test_51POi051PxLOehmUIIL9S0xiFaI3zaxfeMpAfrb4MSs6eb9JKI59tc2SRXQXsbYRgOK4Xo5L9oaUQBBH3KK9QjQZI00YwT0o0Ee');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true

}));
// Recommended by Stripe
app.use(express.static("public"));
// Parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  key: "userId",
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 60 * 60 * 24 * 1000
  }
}))

// Set Axios defaults
axios.defaults.withCredentials = true;

// Spripe POST request -> checkout
app.post("/checkout", async (req, res) => {
  /*
    req.body.items
    [
      {
        id: 1,
        quantity: 3
      }
    ]
    Stripe wants it tomlook like this:
    [
      {
        price: 1,
        quantity: 3
      }
    
    ]
  */
  // Stripe calls 'lineItems' for API call

  try {

    console.log("req.body: ", req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
      lineItems.push(
        {
          price: item.id,
          quantity: item.quantity
        }
      )

    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
    });


    res.send(JSON.stringify({
      url: session.url
    }));

  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }


});

//  Email session validation on home page
app.get('/home', (req, res) => {
  req.session.email 
  ? res.json({valid: true, username: req.session.email})
  : res.json({valid: false})
})



// Signup endpoint
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  console.log("Req.body: ", firstName, lastName, email, password);

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(String(password), 10);

    // Insert user into the database
    const query = `
      INSERT INTO users (firstName, lastName, email, password)
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [firstName, lastName, email, hashedPassword]);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.email = result.rows[0].email;
      console.log("req.session.email: ", req.session.email);
      res.status(200).json({ login: true, username: req.session.email });
    } else {
      res.status(401).json({ login: false });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Logout endpoint
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Failed to logout' });
    } else {
      res.clearCookie('userId'); // Clear the cookie from the client-side
      res.send('You are logged out!');
    }
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





