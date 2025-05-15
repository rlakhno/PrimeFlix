# PrimeFlix

PrimeFlix is a dynamic streaming platform that offers a wide range of movies and TV shows, alongside an integrated online store where users can purchase merchandise and subscriptions. Payments are securely processed through Stripe, ensuring a seamless and engaging user experience.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## Features

- **Streaming Service**: Browse and stream a variety of movies and TV shows.
- **Online Store**: Purchase subscriptions and merchandise directly through the platform.
- **Secure Payments**: Integrated with Stripe for secure transactions.
- **User Authentication**: Secure login and registration with password hashing and session management.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Screenshots
#### Home page
![PrimeFlix Logo](https://github.com/rlakhno/PrimeFlix/blob/main/frontend/public/images/Readme/home-page.jpg)
#### Login page
![PrimeFlix Logo](https://github.com/rlakhno/PrimeFlix/blob/main/frontend/public/images/Readme/login-page.jpg)
#### Profile page
![PrimeFlix Logo](https://github.com/rlakhno/PrimeFlix/blob/main/frontend/public/images/Readme/profile-page.jpg)
#### Secure Checkout page
![PrimeFlix Logo](https://github.com/rlakhno/PrimeFlix/blob/main/frontend/public/images/Readme/secure-checkout-page.jpg)
#### Shopping Cart page
![PrimeFlix Logo](https://github.com/rlakhno/PrimeFlix/blob/main/frontend/public/images/Readme/shopping-cart-page.jpg)
#### Store page
![PrimeFlix Logo](https://github.com/rlakhno/PrimeFlix/blob/main/frontend/public/images/Readme/store-page.jpg)
#### Stripe Test page
![PrimeFlix Logo](https://github.com/rlakhno/PrimeFlix/blob/main/frontend/public/images/Readme/stripe-test-page.jpg)
#### Success page
![PrimeFlix Logo](https://github.com/rlakhno/PrimeFlix/blob/main/frontend/public/images/Readme/success-page.jpg)
#### Videos page
![PrimeFlix Logo](https://github.com/rlakhno/PrimeFlix/blob/main/frontend/public/images/Readme/videos-page.jpg)

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Authentication**: Bcrypt and cookie-based sessions
- **Payments**: Stripe API
- **Build Tools**: Webpack
- **Hosting/Deployment**: in progress

## Installation

***To set up PrimeFlix on your local machine, follow these steps:***

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/PrimeFlix.git
   cd PrimeFlix

2. **Install dependencies**:
   ```bash
   npm install
   cd client
   npm install
   cd ..

3. **Set up the database**:

     ###### Ensure PostgreSQL is installed and configured. Create a database and update the environment variables.

4. **Set up environment variables**:

     ###### Create a .env file in the root directory and add the following variables:
   ```bash
    DB_USER=your_db_user
    DB_HOST=localhost
    DB_DATABASE=your_database_name
    DB_PASSWORD=your_db_password
    DB_PORT=5432
    STRIPE_SECRET_KEY=your_stripe_secret_key

5. **Run the application**:
```bash
    npm run dev

```
### Environment Variables
- DB_USER: PostgreSQL username
- DB_HOST: PostgreSQL host (usually localhost)
- DB_DATABASE: PostgreSQL database name
- DB_PASSWORD: PostgreSQL user password
- DB_PORT: PostgreSQL port (default: 5432)
- STRIPE_SECRET_KEY: Your Stripe API secret key for payment processing

### API Endpoints
Here are some of the key API endpoints:

- GET /api/movies: Retrieve a list of movies available for streaming.
- POST /api/auth/login: Log in a user.
- POST /api/auth/register: Register a new user.
- POST /api/payments/checkout: Process a payment via Stripe.
- GET /api/user/profile: Fetch user profile data.
(Feel free to add more endpoints based on your application's functionality.)

### Contributing
Contributions are welcome! If you'd like to contribute to PrimeFlix, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Commit your changes (git commit -m 'Add YourFeature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a Pull Request.

### Contact
For any inquiries or support, feel free to contact me:

- Name: Rouslan Lakhno
- Email: rouslanlakhno@gmail.com
- GitHub: rlakhno












