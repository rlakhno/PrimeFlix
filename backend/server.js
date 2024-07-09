
// server.js

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const pool = require('./db/pool');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const cookieSession = require('cookie-session');

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
app.use(cookieSession({
  name: 'session',
  keys: ['abc', 'def', 'ghi'],
  maxAge: 24 * 60 * 60 * 1000 //1 day
}))
// Recommended by Stripe
app.use(express.static("public"));
// Parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Set Axios defaults
axios.defaults.withCredentials = true;


// Logout endpoint
app.get('/logout', (req, res) => {
  req.session = null
  res.clearCookie('connect.sid');
  res.send('Logged out');
});



// Signup endpoint
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
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

//  Home endpoint - Email session validation on home page
app.get('/', (req, res) => {
  req.session.username
    ? res.json({ valid: true, username: req.session.email })
    : res.json({ valid: false })
})

//  Session endpoint - Email session validation on home page
app.get('/session', (req, res) => {
  if(req.session.email) {
    res.json({ valid: true, email: req.session.email, firstName: req.session.firstname })
  } else {
    res.json({ valid: false })
  }
  
})


//  Home endpoint - Email session validation on home page
app.get('/home', (req, res) => {
  req.session.email
    ? res.json({ valid: true, email: req.session.email, firstName: req.session.firstname })
    : res.json({ valid: false })
})

// Login GET
app.get('/login', (req, res) => {
  if (res.cookie.user) {
    return res.redirect('/home')
  }
  res.render('/');
})

// Login POST endpoint
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
      req.session = user;
      res.json({ valid: true, });
    } else {
      res.status(401).json({ valid: false });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// session
// app.get('/store', (req, res) => {
//   req.session.message = "hello, world from session";
//   res.send(`<div>Session is Set</div>`)
// })

// app.get('/get-session', (req, res) => {
//   res.send(`<div>Session Value ${req.session.message}</div>`)
// })

